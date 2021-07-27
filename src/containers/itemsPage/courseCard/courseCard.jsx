// @flow
import React, { useReducer, useContext, useEffect } from "react";
import { Button, Card } from "../../../components";
import { Link, useHistory } from "react-router-dom";
import "./style.scss";
import numeral from "numeral";
import { reducer, CARD_ACTION } from "./reducer/reducer";
import { authContext } from "../../../contexts/auth/authContext";
import courseApi from "../../../api/courseAPI";
import accountApi from "../../../api/accountAPI";
import Swal from "sweetalert2";
const initData = {
  paid: false,
  inFavoriteList: false,
  owner: false,
};

export const CourseCard = ({ course, className }) => {
  const [store, dispatch] = useReducer(reducer, initData);
  const { store_auth } = useContext(authContext);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (store_auth.auth) {
        await loadInitComponent();
      }
    })();
  }, [store_auth.auth]);

  const loadInitComponent = async () => {
    const paid = await courseApi.checkPaid({
      courId: course.id,
    });

    dispatch({
      type: CARD_ACTION.UPDATE_PAID,
      payload: paid.data.paid,
    });

    const favorite = await accountApi.getCourseFavorite(
      store_auth.account.id,
      {}
    );

    dispatch({
      type: CARD_ACTION.UPDATE_IN_FAVORITE_LIST,
      payload:
        favorite.data.filter((cour) => +cour.id === course.id).length !== 0,
    });
    dispatch({
      type: CARD_ACTION.UPDATE_OWNER,
      payload: +course.id_owner === +store_auth.account.id,
    });
  };

  const handleFavoriteList = async () => {
    if (!store_auth.auth) {
      history.push("/login");
      return;
    }

    let result = !store.inFavoriteList
      ? (await courseApi.addFavoriteList(course.id)).data.created
      : !(await courseApi.deleteFavoriteList(course.id)).data.deleted;

    Swal.fire({
      icon: "success",
      text: `${result ? "Đã thêm vào" : "Đã xóa khỏi"} danh sách!!`,
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
    });

    dispatch({
      type: CARD_ACTION.UPDATE_IN_FAVORITE_LIST,
      payload: result,
    });
  };

  return (
    <Card
      className={`course-card ${className}`}
      popover={
        <div className="cover-popover">
          <div className="popover-course">
            <div
              className="popover-course__image"
              style={{
                backgroundImage: `url("${course.srcImage}")`,
              }}
            ></div>
            <p className="popover-course__name">{course.courName}</p>
            <p className="popover-course__teacherName">
              Giảng viên:{" "}
              <span className="text--main-color">{course.teacherName}</span>
            </p>
            <p className="popover-course__last-update">
              Cập nhật ngày:{" "}
              <span className="text--main-color">
                {new Date(course.lastUpdate).toLocaleDateString()}
              </span>
            </p>
            <p className="popover-course__desc">{course.tinyDes}</p>
            <div className="rate-course"></div>
            <div className="info-course">
              <div className="info-course__left">
                <span className="text--main-color">{course.lectureCount}</span>{" "}
                videos
              </div>
              <div className="info-course__right">
                <span className="text--main-color">
                  {new Date(+course.duration * 1000)
                    .toISOString()
                    .substr(11, 5)}
                </span>{" "}
                giờ
              </div>
            </div>
            <div className="info-course">
              <div className="info-course__left">
                <span className="text--main-color">
                  {numeral(course.joinerCount).format("0,0")}
                </span>{" "}
                học viên
              </div>
              <div className="info-course__right ">
                <span className="text--main-color text--large">
                  {numeral(course.price).format("0,0")} VND
                </span>
              </div>
            </div>
            <div className="btn-group">
              {!store.owner && (
                <Button
                  className={`btn--hover-horizontal-change-color btn-group__favorite ${
                    store.inFavoriteList ? "added" : ""
                  }`}
                  content={`${
                    store.inFavoriteList ? "Đã thêm" : "Thêm"
                  } vào yêu thích`}
                  onClick={handleFavoriteList}
                ></Button>
              )}
              <Button
                className="btn--color-white"
                content="Chi tiết"
                onClick={() => {
                  history.push(`/courses/${course.id}`);
                }}
              ></Button>
            </div>
          </div>
        </div>
      }
    >
      <div className="item">
        <div className="cover-image">
          <div
            className="item__image"
            style={{
              backgroundImage: `url("${course.srcImage}")`,
            }}
          ></div>
        </div>
        <div className="item__body">
          <div className="item__title">
            <div className="title-main">
              <Link
                to={`/courses/${course.id}`}
                className="title-main__course-name"
              >
                {course.courName}
              </Link>
              <h3 className="title-main__title-cate">{course.catName}</h3>
              <Link
                to={`/teachers/${course.id_owner}`}
                className="title-main__title-teacher"
              >
                {course.teacherName}
              </Link>
            </div>
            <h3 className="item__title-course-price">
              {numeral(course.price).format("0,0")} VND
            </h3>
          </div>
          <div className="item__enroll-btn">
            <h3 className="lecture-count">{course.lectureCount} Bài giảng</h3>
            {!store.owner &&
              (store.paid ? (
                <Button
                  className="btn-smaller btn--hover-change-color"
                  content="Tiếp tục học"
                  onClick={() => {
                    history.push(
                      `/lessions/${course.id}/${course.firstLecture}`
                    );
                  }}
                ></Button>
              ) : (
                <Button
                  className="btn-smaller btn--hover-change-color"
                  content="Ghi danh"
                  onClick={() => {
                    history.push(`/payment/${course.id}`);
                  }}
                ></Button>
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
