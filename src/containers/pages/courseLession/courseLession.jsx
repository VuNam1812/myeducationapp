// @flow
import React, { useReducer, useEffect, useContext } from "react";

import { HeaderUpper } from "../../header/HeaderUpper/headerUpper";

import "./style.scss";

import { handleCourseLession } from "./middleware/handleCourseLessions";
import { authContext } from "../../../contexts/auth/authContext";
import { reducer, LESSION_ACTION } from "./reducer/reducer";
import { useParams, useHistory } from "react-router-dom";

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
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    (async () => {
      await handleCourseLession.checkAccountPayment(
        params,
        store_auth.auth,
        history
      );
    })();
  }, [params, store_auth.auth]);

  useEffect(() => {
    (async () => {
      dispatch({
        type: LESSION_ACTION.UPDATE_ACTIVE,
        payload: +params.lessionId,
      });
      Promise.all([
        handleCourseLession.loadCourse(params, dispatch),
        handleCourseLession.loadLessions(params, dispatch),
      ]);
    })();
  }, [params.courId]);

  useEffect(() => {
    $("html,body").animate({ scrollTop: 0 }, 500);
  }, [store_lecture.active]);

  useEffect(() => {
    handleCourseLession.loadVideo(params, store_lecture.lessions, dispatch);
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
