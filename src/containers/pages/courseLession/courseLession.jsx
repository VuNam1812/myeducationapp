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
      console.log(Object.keys(store_auth.account));
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
      await handleCourseLession.loadCourse(params, dispatch);
      await handleCourseLession.loadLessions(params, dispatch);
    })();
  }, [params.courId]);

  useEffect(() => {
    $("html,body").animate({ scrollTop: 0 }, 500);
  }, [store_lecture.active]);

  useEffect(() => {
    (async () => {
      await handleCourseLession.loadVideo(
        params,
        store_lecture.lessions,
        dispatch
      );
    })();
  }, [store_lecture.active, store_lecture.lessions]);

  return (
    <div className="course-lession">
      <HeaderUpper className="header--zoom-80"></HeaderUpper>
      <div className="lession-content">
        <div className="right-content">
          <VideoPlayer
            className="right-content__video"
            video={store_lecture.video}
          ></VideoPlayer>
          <InfoCourse course={store_lecture.course}></InfoCourse>
        </div>
        <div className="left-content">
          <LessionVideos
            active={store_lecture.active}
            lessions={store_lecture.lessions}
            dispatch={dispatch}
          ></LessionVideos>
        </div>
      </div>
    </div>
  );
};
