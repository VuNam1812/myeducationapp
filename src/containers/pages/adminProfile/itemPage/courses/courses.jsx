// @flow
import React, { useState, useContext, useEffect, useReducer } from "react";
import { Select } from "../../../../../components";
import "./style.scss";
import { categoryContext } from "../../../../../contexts/categories/categoryContext";
import { reducer, COURSES_ADMIN_ACTION } from "./reducer/reducer";
import { Link } from "react-router-dom";
import { handleAdminCourse } from "./middlewares/handleAdminCourse";
import { CourseAdminSkeleton } from "./courseAdminSkeleton/courseAdminSkeleton";
import numeral from "numeral";
const initObject = {
  pagination: [],
  limit: 8,
  listRender: [],
  filterSelected: -1,
  parentCatSelect: -1,
  isSubCategory: false,
  catSelected: -1,
  teacherSelected: -1,
  currentCourses: [],
  loading: true,
};

export const Courses = ({ courses, teachers, adminProfileDispatch }) => {
  const [listCourse, dispatch] = useReducer(reducer, initObject);
  const { store_cat } = useContext(categoryContext);
  useEffect(() => {
    setupPagenation(courses.length);
    dispatch({
      type: COURSES_ADMIN_ACTION.UPDATE_LISTRENDER,
      payload: {
        page: 1,
        courses: courses,
      },
    });
    dispatch({
      type: COURSES_ADMIN_ACTION.UPDATE_CURRENT_COURSES,
      payload: courses,
    });
  }, [courses]);

  useEffect(() => {
    dispatch({
      type: COURSES_ADMIN_ACTION.UPDATE_LOADING,
      payload: true,
    });
    setTimeout(() => {
      dispatch({
        type: COURSES_ADMIN_ACTION.UPDATE_LOADING,
        payload: false,
      });
    }, 1500);
  }, [listCourse.listRender]);

  const handleLoadPagination = (e) => {
    const index = +e.target.getAttribute("data-id");
    dispatch({
      type: COURSES_ADMIN_ACTION.UPDATE_PAGINATION,
      payload: +index,
    });
    dispatch({
      type: COURSES_ADMIN_ACTION.UPDATE_LISTRENDER,
      payload: {
        page: +index,
        courses: listCourse.currentCourses,
      },
    });
  };

  const setupPagenation = (length) => {
    const subPage = length % listCourse.limit > 0 ? 1 : 0;
    const numPage = parseInt(length / listCourse.limit) + subPage;
    dispatch({
      type: COURSES_ADMIN_ACTION.INIT_PAGINATION,
      payload: numPage ? numPage : 1,
    });
  };

  const getParentCat = () => {
    return store_cat.data.map((cat) => {
      return {
        id: cat.id,
        content: cat.catName,
      };
    });
  };

  const getChildrenCat = () => {
    return store_cat.data
      .filter((cat) => cat.id === listCourse.parentCatSelect)[0]
      .subCategory.map((cat) => {
        return {
          id: cat.id,
          content: cat.catName,
        };
      });
  };

  const handleFilterMain = (e) => {
    const index = +e.target.value;

    dispatch({
      type: COURSES_ADMIN_ACTION.RESET_FILTER,
    });

    if (listCourse.currentCourses.length !== courses.length) {
      dispatch({
        type: COURSES_ADMIN_ACTION.UPDATE_LISTRENDER,
        payload: {
          page: 1,
          courses: courses,
        },
      });

      setupPagenation(courses.length);
      dispatch({
        type: COURSES_ADMIN_ACTION.UPDATE_CURRENT_COURSES,
        payload: courses,
      });
    }

    dispatch({
      type: COURSES_ADMIN_ACTION.UPDATE_FILTER_SELECTED,
      payload: +index,
    });
  };

  const handleFilterParentCat = (e) => {
    const index = +e.target.value;

    dispatch({
      type: COURSES_ADMIN_ACTION.UPDATE_PARENT_CAT_SELECTED,
      payload: index,
    });
    dispatch({
      type: COURSES_ADMIN_ACTION.UPDATE_SUB_CATEGORY,
      payload: store_cat.data.filter((cat) => cat.id === index)[0]
        .isSubCategory,
    });
    handleFilterCatSelected(e);
  };

  const handleFilterCatSelected = (e) => {
    const index = +e.target.value;
    let catTarget = [index];
    if (
      store_cat.data.filter((cat) => cat.id === index)[0]?.subCategory?.length
    ) {
      catTarget = [
        ...catTarget,
        ...store_cat.data
          .filter((cat) => cat.id === index)[0]
          .subCategory.map((cat) => cat.id),
      ];
    }

    const newCourse = courses.filter((course) =>
      catTarget.includes(course.id_cat)
    );
    dispatch({
      type: COURSES_ADMIN_ACTION.UPDATE_LISTRENDER,
      payload: {
        page: 1,
        courses: newCourse,
      },
    });

    dispatch({
      type: COURSES_ADMIN_ACTION.UPDATE_CURRENT_COURSES,
      payload: newCourse,
    });

    setupPagenation(newCourse.length);
  };

  const handleFilterTeacherSelected = (e) => {
    const index = +e.target.value;
    const newCourse = courses.filter((course) => course.id_owner === +index);
    dispatch({
      type: COURSES_ADMIN_ACTION.UPDATE_LISTRENDER,
      payload: {
        page: 1,
        courses: newCourse,
      },
    });

    dispatch({
      type: COURSES_ADMIN_ACTION.UPDATE_CURRENT_COURSES,
      payload: newCourse,
    });

    setupPagenation(newCourse.length);
  };

  const handleDisableCourse = async (e) => {
    const courId = +e.currentTarget.getAttribute("data-id");
    await handleAdminCourse.disableCourse(
      courses.filter((course) => course.id === courId)[0],
      adminProfileDispatch,
      dispatch
    );
  };

  return (
    <div className="courses">
      <div className="courses__filter">
        <Select
          value={listCourse.filterSelected}
          onChange={handleFilterMain}
          defaultSelected="--- Bộ lọc ---"
          data={[
            "--- Bộ lọc ---",
            "--- Lọc theo giảng viên ---",
            "--- Lọc theo danh mục ---",
          ]}
          className="select--bottom select--shadow filter__main"
        ></Select>
        {listCourse.filterSelected === 1 && (
          <Select
            onChange={handleFilterTeacherSelected}
            data={teachers.map((teacher) => {
              return {
                id: teacher.id,
                content: teacher.name,
              };
            })}
            defaultSelected="--- Chọn Giảng viên ---"
            className="select--bottom select--shadow filter__sub-filter-item"
          ></Select>
        )}
        {listCourse.filterSelected === 2 && (
          <>
            <Select
              onChange={handleFilterParentCat}
              data={getParentCat()}
              defaultSelected="--- Chọn danh mục ---"
              className="select--bottom select--shadow filter__sub-filter-item"
            ></Select>
            {listCourse.isSubCategory && (
              <Select
                data={getChildrenCat()}
                onChange={handleFilterCatSelected}
                defaultSelected="--- Chọn danh mục ---"
                className="select--bottom select--shadow filter__sub-filter-item"
              ></Select>
            )}
          </>
        )}
      </div>
      <div className="courses__pagination">
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
      <div className="courses__group">
        {listCourse.loading ? (
          <CourseAdminSkeleton></CourseAdminSkeleton>
        ) : (
          listCourse.listRender.map((course, index) => {
            return (
              <div className="courses__item">
                {course.srcImage && (
                  <div className="item__cover">
                    <div
                      className="item__image"
                      style={{
                        backgroundImage: `url("${course.srcImage}")`,
                      }}
                    ></div>
                  </div>
                )}
                <div className="item__info-course">
                  <div className="info-course__header">
                    <Link
                      to={`/courses/${course.id}`}
                      className="info-course__name"
                    >
                      {course.courName}
                    </Link>
                    <div
                      data-id={course.id}
                      className="info-course__status"
                      onClick={handleDisableCourse}
                    >
                      <i
                        class={`icon icon-success fa fa-${
                          !course.isDelete ? "unlock-alt" : "lock disabled"
                        } fa-2x`}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                  <div className="info-course__categories">
                    {course.catName}
                  </div>
                  <div className="info-course__teacher">
                    Giảng viên:{" "}
                    <Link
                      to={`/teachers/${course.id_owner}`}
                      className="text-main"
                    >
                      {course.teacherName}
                    </Link>
                  </div>
                  <div className="info--block-flex">
                    <div className="info-course__lecture">
                      <span className="text-main">{course.lectureCount}</span>{" "}
                      Bài giảng
                    </div>
                    <div className="info-course__price">
                      <span className="text-danger">
                        {numeral(course.price ? course.price : 0).format("0,0")}{" "}
                        VND
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
