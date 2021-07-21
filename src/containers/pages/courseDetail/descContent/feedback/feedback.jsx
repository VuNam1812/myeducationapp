// @flow
import React, { useState, useEffect, useContext } from "react";
import "./style.scss";

import { COURSE_DETAIL_ACTION } from "../../reducer/reducer";

import { Button, Modal } from "../../../../../components";
import numeral from "numeral";

import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";

import courseApi from "../../../../../api/courseAPI";
import Swal from "sweetalert2";
import accountApi from "../../../../../api/accountAPI";
const StyleRating = withStyles({
  iconFilled: {
    color: "#00ab15",
  },
})(Rating);

const RatingFeedBack = withStyles({
  icon: {
    fontSize: "3rem",
  },
  iconFilled: {
    color: "#00ab15",
    fontSize: "3rem",
  },
})(Rating);

export const Feedback = ({ rate, feedbacks, paid, course, dispatch }) => {
  const [modalState, setModalState] = useState("hidden");
  const [textFeedback, setTextFeedback] = useState("");
  const [rateFeedback, setRateFeedback] = useState(0);
  useEffect(() => {
    console.log("run update");
  }, [feedbacks]);

  const handleOpenModalFeedback = () => {
    setModalState("visible");
    setTextFeedback("");
    setRateFeedback(0);
  };

  const handleCreateFeedBack = async () => {
    let result = false;
    await Swal.fire({
      text: "Đang tạo bình luận",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();

        const ret = await courseApi.createFeedback(course.id, {
          rate: rateFeedback,
          content: textFeedback,
        });

        result = ret.data.created;

        if (ret.data?.created) {
          const feedbacks = await courseApi.getFeedbacks(course.id);
          const courseTarget = await courseApi.getSingle(course.id);
          const teacherTarget = await accountApi.getSingle(course.id_owner, {
            getInfo: ["rate"],
          });

          dispatch({
            type: COURSE_DETAIL_ACTION.ADD_FEEDBACK,
            payload: {
              newFeedback: feedbacks.data.feedbacks.filter(
                (fb) => +fb.id === +ret.data.id_feedback
              )[0],
              rate: feedbacks.data.rate,
            },
          });
          dispatch({
            type: COURSE_DETAIL_ACTION.UPDATE_RATE_COURSE,
            payload: {
              rate: courseTarget.data.rate,
              feedbackCount: courseTarget.data.feedbackCount,
            },
          });
          dispatch({
            type: COURSE_DETAIL_ACTION.UPDATE_RATE_TEACHER,
            payload: teacherTarget.data.rate,
          });
        }

        Swal.close();
      },
    });

    if (result) {
      setModalState("close");
      Swal.fire({
        icon: "success",
        text: "Tạo đánh giá thành công.",
        showConfirmButton: false,
        didOpen: async () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng thử lại.",
        showConfirmButton: false,
        didOpen: async () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });
    }
  };

  return (
    <div className="feedback">
      <div className="feedback__header">
        <div className="feedback__header-summary">
          <p className="feedback__header-summary-rate">
            {numeral(rate).format("0.0")}
            <span> / 5</span>
          </p>
          <p className="feedback__header-summary-feedback">
            {feedbacks.feedbacks &&
              `( ${numeral(feedbacks.feedbacks.length).format(
                "0,0"
              )} bình chọn )`}
          </p>
        </div>
        <div className="feedback__header-detail">
          {feedbacks.rate &&
            feedbacks.rate.map((rate, index) => {
              return (
                <div className="rate-item">
                  <p className="rate-item__index">
                    {index + 1}{" "}
                    <i className="icon fa fa-star" aria-hidden="true"></i>
                  </p>
                  <div className="rate-item__rate-bar">
                    <div
                      className="loading-bar"
                      style={{ width: `${rate.percent}%` }}
                    ></div>
                  </div>
                  <div className="group-detail">
                    <p className="rate-item__feedback"> ({rate.count})</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="feedback__body">
        {paid && (
          <>
            <Button
              className="feedback__body-add-btn btn--color-white"
              content="Thêm bình luận"
              onClick={handleOpenModalFeedback}
            ></Button>
            <Modal
              state={modalState}
              onClickOverlay={() => {
                setModalState("close");
              }}
            >
              <div className="feedback-modal">
                <div className="feedback-modal__header">
                  <h3 className="header-feedback__title">Đánh giá</h3>
                </div>
                <div className="feedback-modal__content">
                  <RatingFeedBack
                    precision="1"
                    value={rateFeedback}
                    onChange={(e) => {
                      setRateFeedback(+e.target.value);
                    }}
                  ></RatingFeedBack>
                  <p className="content-feedback__desc">
                    Chạm vào một ngôi sao để đánh giá
                  </p>
                  <div className="content-feedback__text">
                    <p className="text__limit">{textFeedback.length}/1000</p>
                    <textarea
                      placeholder="Nhập đánh giá"
                      className="text__text-area"
                      value={textFeedback}
                      onChange={(e) => {
                        setTextFeedback(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="feedback-modal__footer">
                  <Button
                    content="Hủy bỏ"
                    className="btn-smaller btn--color-white"
                    onClick={() => {
                      setModalState("close");
                    }}
                  ></Button>
                  <Button
                    content="Đánh giá"
                    className="btn-smaller btn--hover-change-color"
                    onClick={handleCreateFeedBack}
                  ></Button>
                </div>
              </div>
            </Modal>
          </>
        )}
        <div className="feedback__body-group">
          {feedbacks.feedbacks &&
            (feedbacks.feedbacks.length === 0 ? (
              <p className="feedback__body-empty">
                (Hiện chưa có bình luận cho khóa học)
              </p>
            ) : (
              feedbacks.feedbacks.map((feedback) => {
                return (
                  <div className="item">
                    <div className="item-user">
                      <div className="item-user__image">
                        <img src={feedback.user.srcImage}></img>
                      </div>
                      <p className="item-user__name">{`${feedback.user.firstName} ${feedback.user.lastName}`}</p>
                    </div>

                    <div className="item-feedback-info">
                      <div className="item-feedback-info__header">
                        <StyleRating
                          value={feedback.rate}
                          precision={1}
                          readOnly
                        ></StyleRating>
                        <div className="group-info">
                          <p className="item-feedback-info__header-time">
                            {new Date(feedback.createAt).toLocaleDateString()}
                          </p>
                          <div className="item-feedback-info__header-reaction">
                            <span className="like">
                              <i
                                class="fa fa-thumbs-o-up"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <span className="dislike">
                              <i
                                class="fa fa-thumbs-o-down"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <p className="report">Báo cáo</p>
                          </div>
                        </div>
                      </div>
                      <p className="item-feedback-info__text">
                        {feedback.content}
                      </p>
                    </div>
                  </div>
                );
              })
            ))}
        </div>
        {feedbacks.feedbacks && feedbacks.feedbacks.length !== 0 && (
          <Button
            className="feedback__body-loadmore-btn btn--none"
            content="----- Tải thêm -----"
          ></Button>
        )}
      </div>
    </div>
  );
};
