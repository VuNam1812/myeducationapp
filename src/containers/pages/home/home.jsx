// @flow
import React, { useReducer, useEffect } from "react";
import { Header } from "../../header/header";
import { Intro } from "./intro/intro";
import { AboutUs } from "./aboutUs/aboutUs";
import { TopCourses } from "./topCourses/topCourses";
import { ImageSection } from "./imageSection/imageSection";
import { Achievements } from "./achievements/achievements";
import { NewCourses } from "./newCourses/newCourses";
import { ViewCourses } from "./viewCourses/viewCourses";
import { TopCategory } from "./topCategory/topCategory";
import { ReadyJoin } from "./readyJoin/readyJoin";
import { Footer } from "../../footer/footer";

import categoryApi from "../../../api/categoryAPI";
import courseApi from "../../../api/courseAPI";
import { reducer, HOME_ACTION } from "./reducer/reducer";

import $ from "jquery";

const initData = {
  topRate: [],
  topView: [],
  topNew: [],
  topCats: [],
};

export const Home = (props) => {
  const [store, dispatch] = useReducer(reducer, initData);

  useEffect(() => {
    courseApi
      .getAll({
        order: "rate",
        sort: "desc",
        limit: 5,
        page: 1,
        getInfo: ["teacherName", "duration", "lectureCount", "firstLecture"],
      })
      .then((courses) => {
        dispatch({
          type: HOME_ACTION.UPDATE_TOP_RATE,
          payload: courses.data.courses,
        });
      });
    courseApi
      .getAll({
        order: "viewCount",
        sort: "desc",
        limit: 10,
        page: 1,
        getInfo: ["catName"],
      })
      .then((courses) => {
        dispatch({
          type: HOME_ACTION.UPDATE_TOP_VIEW,
          payload: courses.data.courses,
        });
      });
    courseApi
      .getAll({
        order: "createAt",
        sort: "desc",
        limit: 10,
        page: 1,
        getInfo: ["teacherName", "catName"],
      })
      .then((courses) => {
        dispatch({
          type: HOME_ACTION.UPDATE_TOP_NEW,
          payload: courses.data.courses,
        });
      });

    categoryApi
      .getAll({
        filter: "topJoin",
      })
      .then((cats) => {
        dispatch({
          type: HOME_ACTION.UPDATE_TOP_CAT,
          payload: cats.data,
        });
      });

    $("html,body").animate({ scrollTop: 0 }, 500);
  }, []);

  return (
    <div className="home">
      <Header></Header>
      <Intro></Intro>
      <AboutUs></AboutUs>
      <TopCourses courses={store.topRate}></TopCourses>
      <ImageSection></ImageSection>
      <Achievements></Achievements>
      <NewCourses courses={store.topNew}></NewCourses>
      <ViewCourses courses={store.topView}></ViewCourses>
      <TopCategory cats={store.topCats}></TopCategory>
      <ReadyJoin></ReadyJoin>
      <Footer></Footer>
    </div>
  );
};
