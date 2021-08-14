// @flow
import React, { useState } from "react";
import { Expander, Modal } from "../../../../../components";
import ReactPlayer from "react-player";
import "./style.scss";
import { useHistory } from "react-router-dom";

import slugify from "slugify";

const configSlug = (url) => {
  return slugify(url, {
    locale: "vi",
    lower: true,
  });
};

export const Videos = ({ course, lessions, paid }) => {
  const history = useHistory();
  const [urlSeleted, setUrlSeleted] = useState("");
  const [stateModal, setStateModel] = useState("hidden");
  const handleVideoLecture = (lecture) => {
    if (paid) {
      history.push(`/lessions/${course.slug}/${lecture.slug}`);
    } else {
      if (lecture.isCanPreview) {
        setStateModel("visible");
        setUrlSeleted(`${lecture.src}`);
      } else {
        setUrlSeleted("");
      }
    }
  };

  return (
    <div className="videos">
      <Modal
        state={stateModal}
        onClickOverlay={() => {
          setStateModel("close");
        }}
      >
        <div className="preview-lession">
          <ReactPlayer
            controls={true}
            url={urlSeleted}
            className={`preview-lession__clip`}
          ></ReactPlayer>
        </div>
      </Modal>
      {lessions.length === 0 ? (
        <div className="videos__empty">(Hiện chưa có bài giảng)</div>
      ) : (
        lessions.map((lession) => {
          return (
            <Expander className="" title={lession.name}>
              {lession.lectures.length ? (
                lession.lectures.map((lecture, index) => {
                  return (
                    <div
                      onClick={() => {
                        handleVideoLecture(lecture);
                      }}
                      className={`lecture-video ${
                        lecture.isCanPreview || paid ? "" : "disabled"
                      }`}
                    >
                      <p className="lecture-video__name">
                        Bài {index}: {lecture.name}
                      </p>
                      <p className="lecture-video__duration">
                        {new Date(1000 * +lecture.duration)
                          .toISOString()
                          .substr(11, 8)}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className={`lecture-video disabled`}>
                  <p className="lecture-video__name">
                    ( Hiện chưa có bài giảng )
                  </p>
                </div>
              )}
            </Expander>
          );
        })
      )}
    </div>
  );
};
