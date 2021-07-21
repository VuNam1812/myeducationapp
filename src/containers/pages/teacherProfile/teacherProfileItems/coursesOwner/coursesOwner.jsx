// @flow
import React, { useEffect, useReducer } from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { EditCourse } from "./editCourse/editCourse";
import { Button, Modal } from "../../../../../components";
import numeral from "numeral";
import { CreateCourse } from "./createCourse/createCourse";

import Swal from "sweetalert2";

import SwiperCore, { Mousewheel, Pagination } from "swiper/core";
import { reducer, COURSES_OWNER_ACTION, enumState } from "./reducer/reducer";

import { handleCourseOwner } from "./middleware/handleCourseOwner";
import { Link } from "react-router-dom";
const initData = {
  renderList: [],
  modalState: enumState.HIDDEN,
  active: 1,
  filterCharacter: 0,
  courseSelect: {},
  categories: [],
};
export const CoursesOwner = ({ account, courses, className, dispatch }) => {
  const [store, coursesOwner_dispatch] = useReducer(reducer, initData);
  SwiperCore.use([Mousewheel, Pagination]);

  useEffect(() => {
    coursesOwner_dispatch({
      type: COURSES_OWNER_ACTION.UPDATE_COURSE,
      payload: courses,
    });
  }, [courses]);

  const handleFilterCharacterCourse = (e) => {
    handleCourseOwner.handleFilterCharacterCourse(
      e,
      courses,
      coursesOwner_dispatch
    );
  };

  const handleSearch = (e) => {
    handleCourseOwner.handleSearchCourse(e, courses, coursesOwner_dispatch);
  };

  const handleCreateCourse = async () => {
    await handleCourseOwner.loadCategories(coursesOwner_dispatch);

    coursesOwner_dispatch({
      type: COURSES_OWNER_ACTION.MODAL_OPEN,
    });
  };

  const loadCourseEdit = async (e) => {
    const index = +e.currentTarget.getAttribute("data-id");

    await handleCourseOwner.loadCategories(coursesOwner_dispatch);
    Swal.fire({
      text: "Tải dữ liệu",
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();

        coursesOwner_dispatch({
          type: COURSES_OWNER_ACTION.UPDATE_COURSE_SELECT,
          payload: courses.filter((course) => course.id === index)[0],
        });
        setTimeout(() => {
          Swal.close();

          coursesOwner_dispatch({
            type: COURSES_OWNER_ACTION.UPDATE_ACTIVE,
            payload: 2,
          });
        }, 500);
      },
    });
  };

  const handleResetCourse = (e) => {
    if (e.target.value === "") {
      coursesOwner_dispatch({
        type: COURSES_OWNER_ACTION.UPDATE_COURSE,
        payload: courses,
      });
    }
  };

  return (
    <div className={`courses-owner ${className}`}>
      <div
        className={`courses-owner__cover ${
          store.active === 1 ? "active-view-courses" : "active-edit-course"
        }`}
      >
        <div className="courses-owner__view-courses">
          <div className="left-block-owner">
            <div className="left-block-owner__fix">
              <div className="filter-header">Bộ lọc ký tự</div>
              <div className="filter-content">
                {dataSet_characters.map((item, index) => {
                  return (
                    <div
                      className={`filter-content__item ${
                        index === store.filterCharacter ? "active" : ""
                      }`}
                      data-id={index}
                      key={index}
                      onClick={handleFilterCharacterCourse}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="right-block-owner">
            <div className="right-block-owner__fix">
              <div className="right-block-owner__search">
                <i
                  className="fa fa-search right-block-owner__search-icon"
                  aria-hidden="true"
                ></i>
                <input
                  onChange={handleResetCourse}
                  onKeyPress={handleSearch}
                  placeholder="Nhập khóa học cần tìm kiếm"
                  className="right-block-owner__search-input"
                ></input>
              </div>
              <div className="right-block-owner__list-course">
                <div className="list-course__headers">
                  <div className="list-course__headers__title">
                    Danh sách khóa học của bạn
                  </div>

                  <Modal
                    dispatch={dispatch}
                    state={store.modalState}
                    onClickOverlay={() => {
                      coursesOwner_dispatch({
                        type: COURSES_OWNER_ACTION.MODAL_CLOSE,
                      });
                    }}
                  >
                    <CreateCourse
                      courseOwnerDispatch={coursesOwner_dispatch}
                      dispatch={dispatch}
                      account={account}
                      categories={store.categories}
                    ></CreateCourse>
                  </Modal>
                  <Button
                    onClick={handleCreateCourse}
                    className="list-course__headers__btn-add btn--square btn--hover-horizontal-change-color"
                    bodyClassName="body-button"
                    content="Thêm mới"
                  ></Button>
                </div>
                <div className="list-course__content">
                  {store.renderList.length === 0 ? (
                    <div className="empty-course">
                      ( Hiện chưa có khóa học )
                    </div>
                  ) : (
                    <Swiper
                      direction={"horizontal"}
                      mousewheel={true}
                      pagination={{
                        clickable: true,
                      }}
                      slidesPerView={3}
                      spaceBetween={16}
                      className="mySwiper list-course__content-block-courses"
                    >
                      {store.renderList.map((course) => {
                        return (
                          <SwiperSlide>
                            <div className="slide-item">
                              {course.srcImage && (
                                <div
                                  className="slide-item__image"
                                  style={{
                                    backgroundImage: `url("${course.srcImage}")`,
                                  }}
                                ></div>
                              )}
                              <div className="slide-item__body">
                                <div className="slide-item__flex">
                                  <Link
                                    to={`/courses/${course.id}`}
                                    className="slide-item__body-title"
                                  >
                                    {course.courName}
                                  </Link>
                                  <div>
                                    <div className="slide-item__body-time">
                                      {course.createAt && (
                                        <p>
                                          Đăng tải:{" "}
                                          <span className="text-main">
                                            {new Date(
                                              course.createAt
                                            ).toLocaleDateString()}
                                          </span>
                                        </p>
                                      )}
                                      {course.lastUpdate && (
                                        <p>
                                          Cập nhật lần cuối:{" "}
                                          <span className="text-main">
                                            {new Date(
                                              course.lastUpdate
                                            ).toLocaleDateString()}
                                          </span>
                                        </p>
                                      )}
                                      <p>
                                        Trạng thái:{" "}
                                        <span
                                          className={`text-${
                                            course.status ? "warning" : "danger"
                                          }`}
                                        >
                                          {course.status
                                            ? "Hoàn thành"
                                            : "Chưa hoàn thành"}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="slide-item__body-info-course">
                                      <div className="block-flex-horizontal">
                                        <p>
                                          <span className="text-main">
                                            {course.lectureCount}
                                          </span>{" "}
                                          bài giảng
                                        </p>

                                        <p>
                                          <span className="text-main">
                                            {new Date(
                                              1000 *
                                                (course.duration
                                                  ? course.duration
                                                  : 0)
                                            )
                                              .toISOString()
                                              .substr(11, 5)}
                                          </span>{" "}
                                          Giờ
                                        </p>
                                      </div>
                                      <div className="block-flex-horizontal">
                                        <p>
                                          <span className="text-main">
                                            {course.joinerCount}
                                          </span>{" "}
                                          học viên
                                        </p>
                                        <p className="text-danger">
                                          {numeral(course.price).format("0,0")}{" "}
                                          VND
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  dataId={course.id}
                                  bodyClassName="slide-item__body-content-btn"
                                  className="btn--square slide-item__body-btn btn--hover-horizontal-change-color"
                                  content="Chỉnh sửa"
                                  onClick={loadCourseEdit}
                                ></Button>
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <EditCourse
          categories={store.categories}
          course={store.courseSelect}
          dispatch={dispatch}
          courseOwnerDispatch={coursesOwner_dispatch}
        ></EditCourse>
      </div>
    </div>
  );
};

const dataSet_characters = new Array(27).fill().map((item, index) => {
  return index === 0 ? (
    <i className="fa fa-globe" aria-hidden="true"></i>
  ) : (
    String.fromCharCode(64 + index)
  );
});
