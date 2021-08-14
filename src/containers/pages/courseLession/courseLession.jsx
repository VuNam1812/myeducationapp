// @flow
import React, { useReducer, useEffect, useContext } from "react";

import { HeaderUpper } from "../../header/HeaderUpper/headerUpper";

import "./style.scss";

import { handleCourseLession } from "./middleware/handleCourseLessions";
import { authContext } from "../../../contexts/auth/authContext";
import { reducer, LESSION_ACTION } from "./reducer/reducer";
import { useLocation, useParams, useHistory } from "react-router-dom";

import { InfoCourse, LessionVideos, VideoPlayer } from "./pageItem";

import $ from "jquery";

const initData = {
  course: {},
  lessions: [],
  active: -1,
  video: {},
};

export const CourseLession = (props) => {
  const [store_lecture, dispatch] = useReducer(reducer, initData);
  const { store_auth } = useContext(authContext);
  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  useEffect(() => {
    (async () => {
      const paid = await handleCourseLession.checkAccountPayment(
        params,
        store_auth.auth,
        history
      );
      if (paid) await handleCourseLession.loadCourse(params, dispatch, history);
    })();
  }, [location, store_auth.auth]);

  useEffect(() => {
    (async () => {
      if (Object.keys(store_lecture.course).length)
        Promise.all([
          handleCourseLession.loadLessions(
            params,
            store_lecture.course,
            dispatch,
            history
          ),
        ]);
    })();
  }, [store_lecture.course]);

  useEffect(() => {
    $("html,body").animate({ scrollTop: 0 }, 500);
  }, [store_lecture.active]);

  useEffect(() => {
    handleCourseLession.loadVideo(
      store_lecture.active,
      store_lecture.lessions,
      dispatch
    );
  }, [store_lecture.active, store_lecture.lessions]);

  return (
    <div className="course-lession">
      <HeaderUpper className="header--zoom-80"></HeaderUpper>
      <div className="lession-content">
        <div className="right-content">
          {Object.keys(store_lecture.video).length === 0 ? (
            <div className="video__loading">
              <i className="icon fa fa-spinner fa-pulse fa-2x fa-fw"></i>
            </div>
          ) : (
            <VideoPlayer
              className="right-content__video"
              video={store_lecture.video}
              dispatch={dispatch}
            ></VideoPlayer>
          )}
          <InfoCourse course={store_lecture.course}></InfoCourse>
        </div>
        <div className="left-content">
          {store_lecture.lessions.length === 0 ? (
            <div className="lession-loading">
              <i className="fa fa-snowflake-o fa-spin fa-2x fa-fw"></i>
            </div>
          ) : (
            <LessionVideos
              active={store_lecture.active}
              lessions={store_lecture.lessions}
              dispatch={dispatch}
            ></LessionVideos>
          )}
        </div>
      </div>
    </div>
  );
};
