// @flow
import React, { useReducer, useEffect, useContext } from "react";
import { Header } from "../../header/header";
import { Footer } from "../../footer/footer";
import { ReadyJoin } from "../home/readyJoin/readyJoin";
import { InComing } from "../../incoming/inComing";
import { Introduce, Videos, Teacher, Feedback } from "./descContent";
import { CourseCat } from "./courseCat/courseCat";

import { Button, NavTab } from "../../../components";
import "./style.scss";

import { authContext } from "../../../contexts/auth/authContext";

import numeral from "numeral";
import { reducer, COURSE_DETAIL_ACTION } from "./reducer/reducer";
import { handleCourseDetail } from "./middleware/handleCourseDetal";
import { useParams, useHistory, useLocation } from "react-router-dom";
import $ from "jquery";
const initData = {
  course: {},
  teacher: {},
  lectures: [],
  feedbacks: {},
  activeTab: 0,
  coursesCat: [],
  paid: false,
  loading: true,
  inFavoriteList: false,
};

export const CourseDetail = (props) => {
  const [store, dispatch] = useReducer(reducer, initData);
  const { store_auth } = useContext(authContext);
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    (async () => {
      dispatch({
        type: COURSE_DETAIL_ACTION.UPDATE_LOADING,
        payload: true,
      });
      await handleCourseDetail.loadCourse(params, dispatch);
      await handleCourseDetail.checkPaid(params, dispatch);
      await handleCourseDetail.checkFavoriteList(
        params,
        store_auth.account,
        dispatch
      );
      setTimeout(() => {
        dispatch({
          type: COURSE_DETAIL_ACTION.UPDATE_LOADING,
          payload: false,
        });
      }, 1000);
    })();
    $("html,body").animate({ scrollTop: 0 }, 500);
  }, [location]);

  useEffect(() => {
    (async () => {
      await handleCourseDetail.loadCourseCat(store.course, dispatch);
    })();
  }, [store.course]);

  const handleTabActive = async (index) => {
    switch (index) {
      case 1:
        await handleCourseDetail.loadTeacher(
          {
            userId: store.course.teacherId,
          },
          dispatch
        );
        break;
      case 2:
        await handleCourseDetail.loadLectures(params, dispatch);
        break;
      case 3:
        await handleCourseDetail.loadFeedbacks(params, dispatch);
        break;
    }
  };

  const handleAddFavoriteList = async () => {
    if (!store_auth.auth) {
      history.push("/login");
      return;
    }
    await handleCourseDetail.handleCourseFavorite(
      store.course,
      store.inFavoriteList,
      dispatch
    );
  };
  return (
    <div className="course-detail">
      <Header></Header>
      <InComing></InComing>
      <div className="wrap">
        <div className="course-detail__body">
          <div className="content">
            <NavTab
              className="tab-course"
              headers={["Giới thiệu", "Giảng viên", "Video", "Đánh giá"]}
              blocks={[
                store.loading ? (
                  <div className="content__loading">
                    <i className="icon fa fa-spinner fa-pulse fa-4x fa-fw"></i>
                  </div>
                ) : (
                  <Introduce course={store.course}></Introduce>
                ),
                !store.loading && <Teacher teacher={store.teacher}></Teacher>,
                !store.loading && (
                  <Videos
                    paid={store.paid}
                    course={store.course}
                    lessions={store.lectures}
                  ></Videos>
                ),
                !store.loading && (
                  <Feedback
                    course={store.course}
                    dispatch={dispatch}
                    paid={store.paid}
                    rate={store.course.rate}
                    feedbacks={store.feedbacks}
                  ></Feedback>
                ),
              ]}
              onChangeActive={handleTabActive}
            ></NavTab>
            <div className="left-content">
              <div className="left-content__body">
                {store.course.srcImage && (
                  <div
                    className="image-course"
                    style={{
                      backgroundImage: `url("${store.course.srcImage}")`,
                    }}
                  >
                    <Button className="image-course__btn btn-afer-rounded">
                      <i
                        className="fa fa-play fa-3x image-course__icon"
                        aria-hidden="true"
                      ></i>
                    </Button>
                    <p className="image-course__desc">Giới thiệu khóa học</p>
                  </div>
                )}

                <div className="join-course">
                  <p className="join-course__price">
                    {numeral(store.course.price).format("0,0")} VND
                  </p>
                  {store_auth.account.id !== store.course.id_owner && (
                    <>
                      <Button
                        onClick={handleAddFavoriteList}
                        className={`join-course__add-fav-btn btn-smaller btn--hover-change-color ${
                          store.inFavoriteList ? "added" : ""
                        }`}
                        content={`${
                          store.inFavoriteList ? "Đã thêm" : "Thêm"
                        } vào yêu thích`}
                      ></Button>
                      {store.paid ? (
                        <Button
                          className="join-course__join-btn btn--color-white btn--hover-vertical-change-color-reverse"
                          content="Tiếp tục học"
                          onClick={() => {
                            history.push(
                              `/lessions/${store.course.id}/${store.course.firstLecture}`
                            );
                          }}
                        ></Button>
                      ) : (
                        <Button
                          className="join-course__join-btn btn--color-white btn--hover-vertical-change-color-reverse"
                          content="Ghi danh"
                          onClick={() => {
                            history.push(`/payment/${store.course.id}`);
                          }}
                        ></Button>
                      )}
                    </>
                  )}
                </div>

                <div className="sub-desc">
                  <p className="sub-desc__title">Khóa học này bao gồm</p>
                  <div className="sub-desc__detail">
                    {store.course.duration ? (
                      <p className="sub-desc__detail-item">
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        {new Date(1000 * +store.course.duration)
                          .toISOString()
                          .substr(11, 5)}{" "}
                        giờ
                      </p>
                    ) : (
                      <p className="sub-desc__detail-item">
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        {new Date(0).toISOString().substr(11, 5)} giờ
                      </p>
                    )}
                    <p className="sub-desc__detail-item">
                      <i className="fa fa-refresh" aria-hidden="true"></i>Truy
                      cập mọi lúc
                    </p>
                    <p className="sub-desc__detail-item">
                      <i className="fa fa-mobile fa-lg" aria-hidden="true"></i>
                      Học tập ngay trên điện thoại di động
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap">
        <CourseCat courses={store.coursesCat}></CourseCat>
      </div>

      <ReadyJoin></ReadyJoin>
      <Footer></Footer>
    </div>
  );
};
