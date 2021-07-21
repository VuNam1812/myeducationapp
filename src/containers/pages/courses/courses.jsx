// @flow
import React, { useEffect, useReducer, useContext } from "react";
import { Header } from "../../header/header";
import { CourseList } from "./courseList/courseList";
import { Footer } from "../../footer/footer";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import { handleCoursePage } from "./middleware/courses.mdw";
import { reducer, COURSES_ACTION } from "./reducer/reducer";
import { authContext } from "../../../contexts/auth/authContext";
import "./style.scss";
import $ from "jquery";
const initData = {
  search: false,
  title: "",
  pagination: [],
  renderList: [],
  pageActive: 1,
  limit: 9,
  direct: 1,
  courses: [],
  filter: 0,
  loading: true,
};

export const Courses = (props) => {
  const [store_courses, dispatch_courses] = useReducer(reducer, initData);
  const { store_auth } = useContext(authContext);
  let params = useParams();
  let { url } = useRouteMatch();
  const location = useLocation();
  useEffect(() => {
    (async () => {
      await handleCoursePage.loadInitPage(
        store_auth,
        url,
        params,
        new URLSearchParams(location.search),
        dispatch_courses
      );
    })();
    setTimeout(() => {
      dispatch_courses({
        type: COURSES_ACTION.UPDATE_LOADING,
        payload: false,
      });
    }, 2000);
  }, [location]);

  useEffect(() => {
    handleCoursePage.filterCourses(
      store_courses.courses,
      store_courses.filter,
      dispatch_courses
    );
  }, [store_courses.filter]);

  useEffect(() => {
    const { pageActive, limit, courses } = store_courses;
    dispatch_courses({
      type: COURSES_ACTION.UPDATE_LOADING,
      payload: true,
    });
    dispatch_courses({
      type: COURSES_ACTION.UPDATE_RENDER_LIST,
      payload: [...courses.slice((pageActive - 1) * limit, pageActive * limit)],
    });
    handleCoursePage.setupPagination(
      courses.length,
      pageActive,
      limit,
      dispatch_courses
    );
    $("html,body").animate({ scrollTop: 0 }, 500);
    if (store_courses.courses.length !== 0) {
      setTimeout(() => {
        dispatch_courses({
          type: COURSES_ACTION.UPDATE_LOADING,
          payload: false,
        });
      }, 2000);
    }
  }, [store_courses.courses, store_courses.pageActive, store_courses.limit]);

  return (
    <div className="courses-page">
      <Header></Header>
      <div className="courses-page__body">
        <div className="wrap">
          <CourseList
            loading={store_courses.loading}
            search={store_courses.search}
            title={store_courses.title}
            courses={store_courses.renderList}
            pagination={store_courses.pagination}
            pagiActive={store_courses.pageActive}
            dispatch={dispatch_courses}
            direct={store_courses.direct}
            filter={store_courses.filter}
          ></CourseList>
        </div>
      </div>
      <Footer coverFooter={true}></Footer>
    </div>
  );
};
