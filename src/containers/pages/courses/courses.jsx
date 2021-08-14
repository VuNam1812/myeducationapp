// @flow
import React, { useEffect, useReducer, useContext } from "react";
import { Header } from "../../header/header";
import { CourseList } from "./courseList/courseList";
import { Footer } from "../../footer/footer";
import { useParams, useLocation, useRouteMatch } from "react-router-dom";
import { handleCoursePage } from "./middleware/courses.mdw";
import { reducer, COURSES_ACTION } from "./reducer/reducer";
import { authContext } from "../../../contexts/auth/authContext";
import "./style.scss";
import $ from "jquery";
const initData = {
  search: false,
  catId: -1,
  title: "",
  pagination: [],
  renderList: [],
  pageActive: 1,
  length: 0,
  limit: 9,
  direct: 1,
  typePage: "",
  filter: 0,
  loading: true,
};

export const Courses = (props) => {
  const [store_courses, dispatch_courses] = useReducer(reducer, initData);
  const { store_auth } = useContext(authContext);
  let { url } = useRouteMatch();
  const params = useParams();
  const location = useLocation();
  useEffect(() => {
    dispatch_courses({
      type: COURSES_ACTION.UPDATE_LOADING,
      payload: true,
    });
    $("html,body").animate({ scrollTop: 0 }, 500);
    (async () => {
      await handleCoursePage.loadInitPage(
        store_auth,
        store_courses,
        url,
        params,
        new URLSearchParams(location.search),
        dispatch_courses
      );
    })();
  }, [location]);

  useEffect(() => {
    dispatch_courses({
      type: COURSES_ACTION.UPDATE_LOADING,
      payload: true,
    });
    $("html,body").animate({ scrollTop: 0 }, 500);
    const info = handleCoursePage.getInfoFilter(store_courses.filter);
    const condition = {
      limit: store_courses.limit,
      page: store_courses.pageActive,
      sort: info.sort,
      order: info.order,
      isDelete: 0,
    };
    handleCoursePage.updateListRender(
      store_auth,
      store_courses.typePage,
      store_courses.catId,
      new URLSearchParams(location.search),
      condition,
      dispatch_courses
    );
  }, [store_courses.filter]);

  useEffect(() => {
    dispatch_courses({
      type: COURSES_ACTION.UPDATE_LOADING,
      payload: true,
    });
    $("html,body").animate({ scrollTop: 0 }, 500);
    handleCoursePage.setupPagination(
      store_courses.length,
      store_courses.pageActive,
      store_courses.limit,
      dispatch_courses
    );
    //update list render
    const info = handleCoursePage.getInfoFilter(store_courses.filter);
    const condition = {
      limit: store_courses.limit,
      page: store_courses.pageActive,
      order: info.order,
      sort: info.sort,
      isDelete: 0,
    };
    handleCoursePage.updateListRender(
      store_auth,
      store_courses.typePage,
      store_courses.catId,
      new URLSearchParams(location.search),
      condition,
      dispatch_courses
    );
  }, [store_courses.pageActive, store_courses.limit]);

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
