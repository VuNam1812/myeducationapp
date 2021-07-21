// @flow
import React, { useState, useEffect, useReducer } from "react";
import { STUDENT_PROFILE_ACTION } from "../../reducer/reducer";
import { Button } from "../../../../../components";
import "./style.scss";
import numeral from "numeral";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
import courseApi from "../../../../../api/courseAPI";
import boxEmpty from '../../../../../public/image/icon/box.png';
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";

const StyleRating = withStyles({
  iconFilled: {
    color: "#00ab15",
  },
})(Rating);

const ACTION = {
  UPDATE_PAGINATION: 1,
  UPDATE_LIMIT: 2,
  UPDATE_LISTRENDER: 3,
  INIT_PAGINATION: 4,
  UPDATE_DIRECTACTIVE: 5,
  UPDATE_LOADING_LIST: 6,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION.INIT_PAGINATION:
      let pageInit = new Array(+payload).fill(null).map((index) => ({
        active: "",
      }));
      pageInit[0].active = "pagination__item--active";
      return {
        ...state,
        pagination: [...pageInit],
        page: 1,
      };
    case ACTION.UPDATE_PAGINATION:
      let page = new Array(state.pagination.length).fill(null).map(() => ({
        active: "",
      }));
      page[+payload - 1].active = "pagination__item--active";
      return {
        ...state,
        pagination: [...page],
        page: +payload,
      };
    case ACTION.UPDATE_LIMIT:
      return {
        ...state,
      };
    case ACTION.UPDATE_LISTRENDER:
      return {
        ...state,
        listRender: [
          ...payload.courses.slice(
            (payload.page - 1) * state.limit,
            payload.page * state.limit
          ),
        ],
        page: +payload.page,
      };
    case ACTION.UPDATE_DIRECTACTIVE:
      const directActiveList = new Array(2).fill(null).map(() => {
        return "";
      });
      directActiveList[payload] = "active";
      return {
        ...state,
        limit: +payload === 0 ? 8 : 5,
        directList: +payload,
        directActive: [...directActiveList],
        page: 1,
      };
    case ACTION.UPDATE_LOADING_LIST:
      return {
        ...state,
        loading_list: payload,
      };
    default:
      return state;
  }
};

const initObject = {
  directList: 0,
  pagination: [],
  limit: 8,
  listRender: [],
  directActive: ["active", ""],
  page: 1,
  loading_list: true,
};

export const CourseList = ({ studentProfileDispatch, courses, type }) => {
  const [listCourse, dispatch] = useReducer(reducer, initObject);
  const history = useHistory();
  useEffect(() => {
    setupPagenation(courses.length);
    dispatch({
      type: ACTION.UPDATE_LISTRENDER,
      payload: {
        courses,
        page: 1,
      },
    });
  }, [courses]);

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: ACTION.UPDATE_LOADING_LIST,
        payload: false,
      });
    }, 1000);
  }, [listCourse.listRender]);

  useEffect(() => {
    setupPagenation(courses.length);
    dispatch({
      type: ACTION.UPDATE_LISTRENDER,
      payload: {
        page: 1,
        courses,
      },
    });
  }, [listCourse.limit]);

  const handleLoadPagination = (e) => {
    const index = +e.target.getAttribute("data-id");
    if (+listCourse.page === +index) return;
    dispatch({
      type: ACTION.UPDATE_LOADING_LIST,
      payload: true,
    });
    dispatch({
      type: ACTION.UPDATE_PAGINATION,
      payload: +index,
    });
    dispatch({
      type: ACTION.UPDATE_LISTRENDER,
      payload: {
        page: +index,
        courses,
      },
    });
  };

  const setupPagenation = (length) => {
    const subPage = length % listCourse.limit > 0 ? 1 : 0;
    const numPage = parseInt(length / listCourse.limit) + subPage;

    dispatch({
      type: ACTION.INIT_PAGINATION,
      payload: numPage ? numPage : 1,
    });
  };

  const handleUpdateDirectActive = (e) => {
    const direct = +e.currentTarget.getAttribute("data-id");
    dispatch({
      type: ACTION.UPDATE_DIRECTACTIVE,
      payload: direct,
    });
  };

  const handleRemoveFavorite = async (e) => {
    const index = +e.currentTarget.getAttribute("data-id");

    const confirm = await Swal.fire({
      icon: "question",
      text: "Xác nhận bỏ yêu thích khóa học?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy bỏ",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#00ab15",
    });

    if (confirm.isConfirmed) {
      const ret = await courseApi.deleteFavoriteList(index);

      if (ret.data.deleted) {
        //disaptch
        updateListRender(index);

        Swal.fire({
          icon: "success",
          text: "Cập nhật thành công.",
          showConfirmButton: false,
          didOpen: async () => {
            setTimeout(() => {
              Swal.close();
            }, 1200);
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Vui lòng thử lại.",
          showConfirmButton: false,
          didOpen: async () => {
            setTimeout(() => {
              Swal.close();
            }, 1200);
          },
        });
      }
    }
  };

  const updateListRender = (id) => {
    const decIndex =
      listCourse.listRender.length % listCourse.limit === 1 ? 1 : 0;
    const newPage = listCourse.page - decIndex;
    setupPagenation(courses.length - 1);
    dispatch({
      type: ACTION.UPDATE_LISTRENDER,
      payload: {
        courses: courses.filter((course) => +course.id !== +id),
        page: newPage,
      },
    });
    studentProfileDispatch({
      type: STUDENT_PROFILE_ACTION.REMOVE_SINGLE_COURSE,
      payload: id,
    });
  };

  return courses.length === 0 ? (
    <div className="course-list__loading">
      <div className='list__empty'>
        <img src={boxEmpty}></img>
        <p>(Hiện chưa có khóa học)</p>
      </div>
    </div>
  ) : (
    <>
      <div className="course-list-header">
        <div className="pagination-course-list">
          {listCourse.pagination.map((item, index) => {
            return (
              <div
                data-id={index + 1}
                className={`pagination__item ${item.active}`}
                onClick={handleLoadPagination}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
        <div className="filter-course-list">
          <div
            data-id="0"
            className={`list ${listCourse.directActive[0]}`}
            onClick={handleUpdateDirectActive}
          >
            <i className="fa fa-th-large" aria-hidden="true"></i>
          </div>
          <div
            data-id="1"
            className={`list ${listCourse.directActive[1]}`}
            onClick={handleUpdateDirectActive}
          >
            <i className="fa fa-th-list" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      {listCourse.loading_list ? (
        <div className="course-list__loading">
          <i className="icon fa fa-refresh fa-spin fa-3x fa-fw"></i>
        </div>
      ) : (
        <div
          className={`course-lists ${
            listCourse.directList === 0 ? "list-horizontal" : "list-vertical"
          }`}
        >
          {listCourse.listRender.map((course) => {
            return (
              <div className="course-item">
                {course.srcImage && (
                  <div
                    className="course-item__image"
                    style={{
                      backgroundImage: `url("${course.srcImage}")`,
                    }}
                  ></div>
                )}

                <div className="block-bottom">
                  <div className="block-bottom__text-left">
                    <Link
                      to={`/courses/${course.id}`}
                      className="block-bottom__name"
                    >
                      {course.courName}
                    </Link>
                    <div className="block-bottom__block-flex">
                      <p
                        className={`block-bottom__desc ${
                          listCourse.directList === 0 ? "hidden" : ""
                        }`}
                      >
                        {course.tinyDes}
                      </p>
                      <p className="block-bottom__teacherName">
                        Giảng viên:{" "}
                        <Link
                          to={`/teachers/${course.id_owner}`}
                          className="text--main-color"
                        >
                          {course.teacherName}
                        </Link>
                      </p>
                      {type === "join" ? (
                        <p className="block-bottom__pay-date">
                          Đã thanh toán:{" "}
                          <span className="text--main-color">
                            {new Date(course.payAt).toLocaleDateString()}
                          </span>
                        </p>
                      ) : (
                        <p className="block-bottom__pay-date">
                          Đã ghi danh:{" "}
                          <span className="text--main-color">
                            {numeral(course.joinerCount).format("0,0")}
                          </span>{" "}
                          học viên
                        </p>
                      )}
                      <div className="block-bottom__more-info">
                        <p>
                          <span className="text--main-color">
                            {course.lectureCount}
                          </span>{" "}
                          Bài học
                        </p>
                        <div
                          className={`rating__stars ${
                            listCourse.directList === 0 ? "hidden" : ""
                          }`}
                        >
                          <p>
                            <span className="text--main-color">
                              {numeral(course.rate).format("0.0")}
                            </span>
                            /5
                          </p>
                          <StyleRating
                            className="stars"
                            value={course.rate}
                            precision={0.1}
                            readOnly
                          ></StyleRating>
                        </div>
                      </div>
                    </div>
                  </div>
                  {type === "join" ? (
                    <Button
                      className="block-bottom__btn-join btn-smaller btn--color-white btn--hover-vertical-change-color-reverser"
                      content="Tiếp tục học"
                      onClick={() => {
                        history.push(
                          `/lessions/${course.id}/${course.firstLecture}`
                        );
                      }}
                    ></Button>
                  ) : (
                    <>
                      <Button
                        className="block-bottom__btn-join btn-smaller  btn--hover-vertical-change-color"
                        content={course.paid ? "Tiếp tục học" : "Ghi danh"}
                        onClick={() => {
                          history.push(
                            course.paid
                              ? `/lessions/${course.id}/${course.firstLecture}`
                              : `/payment/${course.id}`
                          );
                        }}
                      ></Button>

                      <div
                        data-id={course.id}
                        className="block-bottom__btn-remove"
                        onClick={handleRemoveFavorite}
                      >
                        <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
