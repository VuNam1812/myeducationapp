// @flow
import React, { useReducer, useRef, useContext } from "react";
import ReactPlayer from "react-player";
import "./style.scss";
import {
  Modal,
  Expander,
  Button,
  FieldText,
  RadioButton,
} from "../../../../../../../components";
import { authContext } from "../../../../../../../contexts/auth/authContext";

import {
  reducer,
  LESSIONS_COURSE_ACTION,
  enumState,
} from "../../reducer/lessionsCourseReducer";
import { handleLessionCourse } from "../../middleware/handleLessionCourse";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
const initData = {
  modalChapterState: enumState.HIDDEN,
  modalLectureState: enumState.HIDDEN,
  isCreateChapter: false,
  isCreateLecture: false,
  chapterSelect: {},
  lectureSelect: {},
  urlVideo: "",
  fileSelected: {},
  errors: {
    chapterName: {
      isShow: false,
      message: "*Tên chủ đề hiện đang trống!!",
    },
    lectureName: {
      isShow: false,
      message: "*Tên bài giảng hiện đang trống!!",
    },
  },
};

export const LessionsCourse = ({ course, lessions, editCourseDispatch }) => {
  const [store, lessionsCourse_dispatch] = useReducer(reducer, initData);
  const { store_auth } = useContext(authContext);
  const { register, getValues, setValue } = useForm();
  const file = useRef();
  const video = useRef();
  const handleCreateChapterModalOpen = () => {
    setValue("chapterName", "");

    lessionsCourse_dispatch({
      type: LESSIONS_COURSE_ACTION.RESET_ERROR,
    });

    lessionsCourse_dispatch({
      type: LESSIONS_COURSE_ACTION.UPDATE_CHAPTER_SELECT,
      payload: {},
    });
    lessionsCourse_dispatch({
      type: LESSIONS_COURSE_ACTION.MODAL_CHAPTER_CREATE_OPEN,
    });
  };

  const handleEditChapterModalOpen = (chapter) => {
    lessionsCourse_dispatch({
      type: LESSIONS_COURSE_ACTION.MODAL_CHAPTER_EDIT_OPEN,
    });

    lessionsCourse_dispatch({
      type: LESSIONS_COURSE_ACTION.RESET_ERROR,
    });

    lessionsCourse_dispatch({
      type: LESSIONS_COURSE_ACTION.UPDATE_CHAPTER_SELECT,
      payload: chapter,
    });

    setValue("chapterName", chapter.name);
  };

  const handleCreateChapter = async () => {
    if (
      !handleLessionCourse.checkChapterName(
        getValues(),
        lessionsCourse_dispatch
      )
    )
      return;

    const result = await handleLessionCourse.createChapter(
      course.id,
      getValues(),
      editCourseDispatch
    );

    if (result) {
      lessionsCourse_dispatch({
        type: LESSIONS_COURSE_ACTION.MODAL_CHAPTER_CLOSE,
      });

      setValue("chapterName", "");
    }
  };

  const handleEditChapter = async () => {
    if (
      !handleLessionCourse.checkChapterName(
        getValues(),
        lessionsCourse_dispatch
      )
    )
      return;
    const result = await handleLessionCourse.editChapter(
      store.chapterSelect,
      getValues(),
      editCourseDispatch
    );

    if (result) {
      lessionsCourse_dispatch({
        type: LESSIONS_COURSE_ACTION.MODAL_CHAPTER_CLOSE,
      });

      setValue("chapterName", "");
      lessionsCourse_dispatch({
        type: LESSIONS_COURSE_ACTION.UPDATE_CHAPTER_SELECT,
        payload: {},
      });
    }
  };

  const handleCreateLectureModalOpen = (lession) => {
    setValue("lectureName", "");
    setValue("src", "");
    setValue("id_chapter", +lession.id);
    setValue("isCanPreview", 0);
    lessionsCourse_dispatch({
      type: LESSIONS_COURSE_ACTION.RESET_ERROR,
    });

    lessionsCourse_dispatch({
      type: LESSIONS_COURSE_ACTION.UPDATE_URL_VIDEO,
      payload: "",
    });

    lessionsCourse_dispatch({
      type: LESSIONS_COURSE_ACTION.UPDATE_LECTURE_SELECT,
      payload: {},
    });

    lessionsCourse_dispatch({
      type: LESSIONS_COURSE_ACTION.MODAL_LECTURE_CREATE_OPEN,
    });
  };

  const handleEditLectureModalOpen = (lecture) => {
    lessionsCourse_dispatch({
      type: LESSIONS_COURSE_ACTION.MODAL_LECTURE_EDIT_OPEN,
    });

    lessionsCourse_dispatch({
      type: LESSIONS_COURSE_ACTION.RESET_ERROR,
    });

    lessionsCourse_dispatch({
      type: LESSIONS_COURSE_ACTION.UPDATE_LECTURE_SELECT,
      payload: lecture,
    });
    if (lecture.src.length) {
      lessionsCourse_dispatch({
        type: LESSIONS_COURSE_ACTION.UPDATE_URL_VIDEO,
        payload: lecture.src,
      });
      setValue("src", lecture.src);
    } else {
      lessionsCourse_dispatch({
        type: LESSIONS_COURSE_ACTION.UPDATE_URL_VIDEO,
        payload: "",
      });
      setValue("src", "");
    }

    setValue("lectureName", lecture.name);
    setValue("isCanPreview", lecture.isCanPreview);
  };

  const handleLoadLectureVideo = async (e) => {
    console.log(e.target.files);
    if (e.target.files.length === 0) return;
    if (store.urlVideo.length) {
      const result = await Swal.fire({
        icon: "question",
        text: "Thay đổi video bài giảng đang có?",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Thay đổi",
        cancelButtonText: "Hủy bỏ",
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#00ab15",
      });
      if (result.isConfirmed) {
        lessionsCourse_dispatch({
          type: LESSIONS_COURSE_ACTION.UPDATE_URL_VIDEO,
          payload: URL.createObjectURL(e.target.files[0]),
        });
        setValue("src", e.target.files[0]);
      }
    } else {
      lessionsCourse_dispatch({
        type: LESSIONS_COURSE_ACTION.UPDATE_URL_VIDEO,
        payload: URL.createObjectURL(e.target.files[0]),
      });
      setValue("src", e.target.files[0]);
    }
  };

  const handleCreateLecture = async (e) => {
    if (!handleLessionCourse.checkLecture(getValues(), lessionsCourse_dispatch))
      return;
    setValue("duration", +Math.round(video.current.getDuration()));

    const result = await handleLessionCourse.createLecture(
      store_auth.account,
      getValues(),
      editCourseDispatch
    );

    if (result) {
      lessionsCourse_dispatch({
        type: LESSIONS_COURSE_ACTION.MODAL_LECTURE_CLOSE,
      });
    }
  };

  const handleEditLecture = async () => {
    if (!handleLessionCourse.checkLecture(getValues(), lessionsCourse_dispatch))
      return;

    setValue("duration", +Math.round(video.current.getDuration()));

    const result = await handleLessionCourse.editLecture(
      store_auth.account,
      store.lectureSelect,
      getValues(),
      editCourseDispatch
    );

    if (result) {
      lessionsCourse_dispatch({
        type: LESSIONS_COURSE_ACTION.MODAL_LECTURE_CLOSE,
      });
    }
  };

  return (
    <>
      <Modal
        state={store.modalChapterState}
        onClickOverlay={() => {
          lessionsCourse_dispatch({
            type: LESSIONS_COURSE_ACTION.MODAL_CHAPTER_CLOSE,
          });
        }}
      >
        <div className="modal-chapter">
          <div className="modal-chapter__header">
            <p className="header__title-chapter">
              {store.isCreateChapter ? "Tạo mới" : "Chỉnh sửa"} chủ đề
            </p>
          </div>
          <div className="modal-chapter__body">
            <FieldText
              label="Tên chủ đề"
              placeHolder="Chủ đề"
              name="chapterName"
              error={store.errors.chapterName}
              defaultValue={
                Object.keys(store.chapterSelect).length === 0
                  ? ""
                  : store.chapterSelect.name
              }
              register={register}
            ></FieldText>
          </div>
          <div className="modal-chapter__footer">
            <Button
              className="footer__btn-chapter btn--hover-change-color"
              content={store.isCreateChapter ? "Thêm mới" : "Cập nhật"}
              bodyClassName="footer__btn-chapter-body"
              onClick={
                store.isCreateChapter ? handleCreateChapter : handleEditChapter
              }
            ></Button>
          </div>
        </div>
      </Modal>

      <Modal
        state={store.modalLectureState}
        onClickOverlay={() => {
          file.current.value = "";
          lessionsCourse_dispatch({
            type: LESSIONS_COURSE_ACTION.MODAL_LECTURE_CLOSE,
          });
        }}
      >
        <div className="modal-lecture">
          <div className="modal-lecture__header">
            <p className="header__title-lecture">
              {store.isCreateLecture ? "Tạo mới" : "Chỉnh sửa"} chủ đề
            </p>
          </div>
          <div className="modal-lecture__body">
            <div className="lecture-body__video-lession">
              <ReactPlayer
                ref={video}
                controls={true}
                url={store.urlVideo}
                className={`video-lession__clip ${
                  store.urlVideo.length ? "active" : ""
                }`}
              ></ReactPlayer>
              <input
                type="file"
                accept="video/mp4"
                onChange={handleLoadLectureVideo}
                ref={file}
                hidden
              ></input>
              <Button
                onClick={() => {
                  file.current.click();
                }}
                content={`${
                  store.urlVideo.length ? "Cập nhật" : "Thêm"
                } bài giảng`}
                className="video-lession__btn-upload btn--color-white btn--square btn--hover-vertical-change-color-reverse"
              ></Button>
            </div>
            <FieldText
              label="Tên bài giảng"
              placeHolder="Bài giảng"
              className="field--none-rounded"
              name="lectureName"
              error={store.errors.lectureName}
              defaultValue={
                Object.keys(store.lectureSelect).length === 0
                  ? ""
                  : store.lectureSelect.name
              }
              register={register}
            ></FieldText>
            <div className="lecture-body__radio-input">
              <label className="radio-input__label">Xem trước</label>
              <RadioButton
                className="radio-input__input"
                onChange={(e) => {
                  setValue("isCanPreview", +e.target.value);
                }}
                value={getValues().isCanPreview}
                items={["Không", "Có"]}
              ></RadioButton>
            </div>
          </div>
          <div className="modal-lecture__footer">
            <Button
              className="footer__btn-lecture btn--hover-change-color"
              content={store.isCreateLecture ? "Thêm mới" : "Cập nhật"}
              bodyClassName="footer__btn-lecture-body"
              onClick={
                store.isCreateLecture ? handleCreateLecture : handleEditLecture
              }
            ></Button>
          </div>
        </div>
      </Modal>

      <Button
        onClick={handleCreateChapterModalOpen}
        className="lession-info__add-btn btn-smaller btn--hover-change-color"
        content="Thêm mới"
      ></Button>
      <div className="lession-info__content">
        {lessions.length === 0 ? (
          <p className="lession-info__empty">( Hiện chưa có bài giảng )</p>
        ) : (
          <>
            {lessions.map((lession) => {
              return (
                <Expander
                  className="lession-info__expander-lecture"
                  overideRightComponent={
                    <div className="expander-left-control">
                      <div
                        className="left-control__btn bg--success"
                        onClick={() => {
                          handleCreateLectureModalOpen(lession);
                        }}
                      >
                        <i className="icon fa fa-plus" aria-hidden="true"></i>
                      </div>
                      <div
                        className="left-control__btn bg--info"
                        onClick={() => {
                          handleEditChapterModalOpen(lession);
                        }}
                      >
                        <i className="icon fa fa-pencil" aria-hidden="true"></i>
                      </div>
                      <div
                        className="left-control__btn bg--danger"
                        onClick={() => {
                          handleLessionCourse.deleteChapter(
                            lession,
                            editCourseDispatch
                          );
                        }}
                      >
                        <i className="icon fa fa-trash" aria-hidden="true"></i>
                      </div>
                    </div>
                  }
                  title={lession.name}
                >
                  {lession.lectures.length ? (
                    lession.lectures.map((lecture, index) => {
                      return (
                        <div className="expander__lession-item">
                          <div className="lession-item__info-lecture">
                            <p className="info-lecture__name">
                              Bài {index + 1}: {lecture.name}
                            </p>

                            <p className="info-lecture__duration">
                              {new Date(
                                1000 * (lecture.duration ? lecture.duration : 0)
                              )
                                .toISOString()
                                .substr(11, 8)}
                            </p>
                          </div>
                          <div className="expander-left-control">
                            <div
                              className="left-control__btn bg--info"
                              onClick={() => {
                                handleEditLectureModalOpen(lecture);
                              }}
                            >
                              <i
                                className="icon fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                            </div>
                            <div
                              className="left-control__btn bg--danger"
                              onClick={() => {
                                handleLessionCourse.deleteLecture(
                                  lecture,
                                  editCourseDispatch
                                );
                              }}
                            >
                              <i
                                className="icon fa fa-trash"
                                aria-hidden="true"
                              ></i>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="expander__lession-empty">
                      ( Hiện chưa có nội dung )
                    </p>
                  )}
                </Expander>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
