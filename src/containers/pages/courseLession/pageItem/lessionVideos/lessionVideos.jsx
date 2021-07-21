// @flow
import React from "react";
import "./style.scss";
import { Expander } from "../../../../../components";
import { LESSION_ACTION } from "../../reducer/reducer";
import { useParams, useHistory } from "react-router-dom";

export const LessionVideos = ({ lessions, active, dispatch }) => {
  const params = useParams();
  const history = useHistory();
  return (
    <div className="lession-videos">
      {lessions &&
        (lessions.length === 0 ? (
          <p>( Khóa học hiện chưa có bài giảng )</p>
        ) : (
          lessions.map((lession, index) => {
            return (
              <Expander
                className={index === 0 ? "active" : ""}
                title={lession.name}
              >
                {lession.lectureCount === 0 ? (
                  <p>( Hiện chưa có nội dung )</p>
                ) : (
                  lession.lectures.map((lecture, index) => {
                    return (
                      <div
                        className={`lecture-video ${
                          +active === +lecture.id ? "active" : ""
                        }`}
                      >
                        <p
                          className="lecture-video__name"
                          onClick={() => {
                            dispatch({
                              type: LESSION_ACTION.UPDATE_ACTIVE,
                              payload: +lecture.id,
                            });
                            history.push(
                              `/lessions/${params.courId}/${lecture.id}`
                            );
                          }}
                        >
                          Bài {index + 1}: {lecture.name}
                        </p>
                        <div className="lecture-video__flex">
                          <p className="lecture-video__duration">
                            <i
                              className="icon fa fa-clock-o"
                              aria-hidden="true"
                            ></i>
                            {new Date(1000 * lecture.duration)
                              .toISOString()
                              .substr(11, 8)}
                          </p>
                          <i
                            className={`icon-status fa ${
                              lecture.isComplete
                                ? "fa-check-square"
                                : "fa-square-o"
                            } fa-lg`}
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    );
                  })
                )}
              </Expander>
            );
          })
        ))}
    </div>
  );
};
