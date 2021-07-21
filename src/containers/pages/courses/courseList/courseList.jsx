// @flow
import React from "react";
import "./style.scss";
import { Button, Checkbox, Select } from "../../../../components";
import numeral from "numeral";
import boxEmpty from "../../../../public/image/icon/box.png";
import { COURSES_ACTION } from "../reducer/reducer";
import { Link, useHistory } from "react-router-dom";
import { SkeletonCourses } from "../skeleton/skeletonCourses";
export const CourseList = (props) => {
  const history = useHistory();
  const handleLoadPage = (e) => {
    const index = e.target.getAttribute("data-id");
    props.dispatch({
      type: COURSES_ACTION.UPDATE_PAGE_ACTIVE,
      payload: +index,
    });
  };

  const handleChangeViewItem = (direct) => {
    if (props.direct === +direct) return;

    let newDirect = {
      pageActive: 1,
      direct: +direct,
      limit: +direct === 0 ? 5 : 9,
    };

    props.dispatch({
      type: COURSES_ACTION.UPDATE_VIEW_ITEM,
      payload: newDirect,
    });
  };

  const handleFilter = (e) => {
    const index = +e.target.value;

    props.dispatch({
      type: COURSES_ACTION.UPDATE_FILTER,
      payload: +index,
    });
  };

  return (
    <div className="course-list">
      <p className="course-list__header">
        Tất cả khóa học{" "}
        {props.title &&
          `của ${props.search ? "từ khóa" : "danh mục"} "${props.title}"`}
      </p>
      <div className="course-list__content">
        <div className="body-list">
          <div className="body-list__filter">
            <Select
              data={dataSet_filter}
              className="body-list__filter-select select--bottom select--shadow"
              defaultSelected={`${dataSet_filter[props.filter]}`}
              onChange={handleFilter}
              value={props.filter}
            ></Select>
            <div className="btn-filter-list">
              <Button
                onClick={() => handleChangeViewItem(0)}
                className={`btn--color-white btn--square btn-filter-list__btn ${
                  props.direct === 0 ? "active" : ""
                }`}
              >
                <i className="fa fa-th-list" aria-hidden="true"></i>
              </Button>
              <Button
                onClick={() => handleChangeViewItem(1)}
                className={`btn--color-white btn--square btn-filter-list__btn  ${
                  props.direct === 1 ? "active" : ""
                }`}
              >
                <i className="fa fa-th-large" aria-hidden="true"></i>
              </Button>
            </div>
          </div>
          {props.loading ? (
            <SkeletonCourses
              limit={props.direct === 1 ? 9 : 5}
              className={props.direct === 1 ? "vertical" : "horizontal"}
            ></SkeletonCourses>
          ) : (
            <div className="body-list__content">
              <div className="courses">
                {props.courses.length !== 0 ? (
                  props.courses.map((course) => {
                    return (
                      <div
                        className={`courses-item ${
                          props.direct === 1
                            ? "item--verticle"
                            : "item--horizontal"
                        }`}
                      >
                        <div className="cover-image">
                          <div
                            className="courses-item__image"
                            style={{
                              backgroundImage: `url("${course.srcImage}")`,
                            }}
                          ></div>
                        </div>
                        <div className="courses-item__body">
                          <div className="courses-item__title">
                            <div className="title-main">
                              <Link
                                to={`/courses/${course.id}`}
                                className="title-main__course-name"
                              >
                                {course.courName}
                              </Link>
                              <div>
                                <p className="title-main__cat-name">
                                  {course.catName}
                                </p>
                                <p className="title-main__teacher-name">
                                  Giảng viên:{" "}
                                  <Link to={`/teachers/${course.teacherId}`}>
                                    {course.teacherName}
                                  </Link>
                                </p>
                                <h3 className="title-main__course-price">
                                  {numeral(course.price).format(0, 0)} VND
                                </h3>
                              </div>
                              <div
                                className={`title-main__sub-info ${
                                  props.direct === 1 ? "hidden" : ""
                                }`}
                              >
                                <p className="text--warning">
                                  {course.rate}{" "}
                                  <i
                                    className="fa fa-star"
                                    aria-hidden="true"
                                  ></i>
                                </p>
                                <p className="text--info">
                                  {numeral(course.joinerCount).format("0,0")}{" "}
                                  <i
                                    className="fa fa-users"
                                    aria-hidden="true"
                                  ></i>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="courses-item__enroll-btn">
                            <h3 className="lecture-count">
                              {course.lectureCount} bài giảng
                            </h3>
                            {!course.owner && (
                              <Button
                                className="btn-smaller btn--hover-change-color"
                                content={`${
                                  course.paid ? "Tiếp tục học" : "Ghi danh"
                                }`}
                                onClick={() => {
                                  history.push(
                                    `${
                                      course.paid
                                        ? `/lessions/${course.id}/${course.firstLecture}`
                                        : `/payment/${course.id}`
                                    }`
                                  );
                                }}
                              ></Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="course-list__loading">
                    <div className="list__empty">
                      <img src={boxEmpty}></img>
                      <p>(Hiện chưa có khóa học)</p>
                    </div>
                  </div>
                )}
              </div>
              {props.pagination.length > 1 && (
                <div className="pagination">
                  {props.pagination.map((item) => {
                    return (
                      <div
                        data-id={item.id}
                        className={`pagination__item ${item.active}`}
                        onClick={handleLoadPage}
                      >
                        {item.id}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="filter-by">
          <p className="filter-by__header">Filter by</p>
          <div className="filter-by__content">
            {dataSet_filterBy.map((item, index) => {
              return (
                <div key={index} className="content-items">
                  <p className="content-items__title">{item.title}</p>
                  <div className="content-items__body">
                    {item.items.map((itemFilter, indexItem) => {
                      return (
                        <label
                          key={indexItem}
                          className="content-items__body-item"
                        >
                          <Checkbox className="checkbox-basic"></Checkbox>
                          {itemFilter.name} <span> ({itemFilter.count})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const dataSet_filterBy = [
  {
    title: "Skill Level",
    items: [
      { name: "All Level", count: "31.000" },
      { name: "Beginner", count: "21.000" },
      { name: "Intermediate", count: "11.000" },
      { name: "Expert", count: "12.000" },
    ],
  },
  {
    title: "Ratings",
    items: [
      { name: "3 Star & Up", count: "11.000" },
      { name: "4 Star & Up", count: "12.000" },
      { name: "5 Star & Up", count: "32.000" },
    ],
  },
  {
    title: "Duration",
    items: [
      { name: "0-3 Hours", count: "11.000" },
      { name: "3-6 Hours", count: "12.000" },
      { name: "6-17 Hours", count: "3.000" },
      { name: "17+ Hours", count: "2.000" },
    ],
  },
  {
    title: "Language",
    items: [
      { name: "English", count: "11.000" },
      { name: "Português", count: "12.000" },
      { name: "Español", count: "3.000" },
      { name: "Deutsch", count: "2.000" },
      { name: "日本語", count: "2.000" },
    ],
  },
  {
    title: "Subtitles",
    items: [
      { name: "English", count: "11.000" },
      { name: "Português", count: "12.000" },
      { name: "Español", count: "3.000" },
      { name: "Deutsch", count: "2.000" },
      { name: "日本語", count: "2.000" },
    ],
  },
];

const dataSet_filter = [
  "-- Bộ lọc--",
  "-- Học phí tăng dần--",
  "-- Điểm đánh giá giảm dần --",
];
