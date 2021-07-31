// @flow
import React, { useReducer, useEffect, useRef, useContext } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import Swal from "sweetalert2";

import { Button, NavTab } from "../../../../../components";
import "./style.scss";
import { useForm } from "react-hook-form";

import { reducer, INFO_TEACHER_ACTION } from "./reducer";
import { authContext } from "../../../../../contexts/auth/authContext";
import { handleStudentProfile } from "../../../studentProfile/middleware/handleStudentProfile";
import accountApi from "../../../../../api/accountAPI";
import teacherApi from "../../../../../api/teacherAPI";
import { AUTH_ACTION } from "../../../../../contexts/auth/reducer";
const initData = {
  introEditor: EditorState.createEmpty(),
  techniqueEditor: EditorState.createEmpty(),
  loading: true,
};

export const InfoTeacher = ({ teacher, className, dispatch }) => {
  const { dispatch_auth } = useContext(authContext);
  const [info_store, dispatch_info] = useReducer(reducer, initData);
  const { register, setValue, handleSubmit } = useForm();
  const submit = useRef();
  const file = useRef();
  useEffect(() => {
    ["name", "major", "phone", "email"].map((item) => {
      setValue(item, teacher[item]);
      return {};
    });
    if (teacher.teacherDesc) {
      dispatch_info({
        type: INFO_TEACHER_ACTION.UPDATE_INTRO_EDITOR,
        payload: EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(teacher.teacherDesc).contentBlocks
          )
        ),
      });
    }
    if (teacher.techniques) {
      dispatch_info({
        type: INFO_TEACHER_ACTION.UPDATE_TECHNIQUE_EDITOR,
        payload: EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(teacher.techniques).contentBlocks
          )
        ),
      });
    }
    setTimeout(() => {
      dispatch_info({
        type: INFO_TEACHER_ACTION.UPDATE_LOADING,
        payload: false,
      });
    }, 2000);
  }, [teacher, setValue]);

  const updateIntroEditor = (editorState) => {
    dispatch_info({
      type: INFO_TEACHER_ACTION.UPDATE_INTRO_EDITOR,
      payload: editorState,
    });
  };

  const updateTechniqueEditor = (editorState) => {
    dispatch_info({
      type: INFO_TEACHER_ACTION.UPDATE_TECHNIQUE_EDITOR,
      payload: editorState,
    });
  };

  const onSubmitUpdateInfo = async (data) => {
    const confirm = await Swal.fire({
      icon: "question",
      text: "Bạn có thực sự muốn cập nhật?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy bỏ",
      confirmButtonColor: "#00ab15",
      cancelButtonColor: "#dc3545",
      allowOutsideClick: false,
    });

    if (confirm.isConfirmed) {
      Swal.fire({
        text: "Cập nhật thông tin",
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: async () => {
          Swal.showLoading();

          const patchInfo = { ...data };
          delete patchInfo["major"];
          const text_technique = draftToHtml(
            convertToRaw(info_store.techniqueEditor.getCurrentContent())
          );
          const text_intro = draftToHtml(
            convertToRaw(info_store.introEditor.getCurrentContent())
          );
          try {
            const res_infoMore = await teacherApi.updateInfo(teacher.id, {
              major: data.major,
              teacherDesc: text_intro === "<p></p>\n" ? "" : text_intro,
              techniques: text_technique === "<p></p>\n" ? "" : text_technique,
            });

            const res = await accountApi.updateInfo(teacher.id, patchInfo);
            if (res.data.updated && res_infoMore.data.updated) {
              dispatch_auth({
                type: AUTH_ACTION.UPDATE_NAME_ACCOUNT,
                payload: patchInfo.name,
              });
              Swal.fire({
                icon: "success",
                text: "Cập nhật thành công!!",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: async () => {
                  setTimeout(() => {
                    Swal.close();
                  }, 1000);
                },
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Cập nhật thất bại",
                text: "Vui lòng thử lại!!",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: async () => {
                  setTimeout(() => {
                    Swal.close();
                  }, 1000);
                },
              });
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Cập nhật thất bại",
              text: "Vui lòng thử lại!!",
              showConfirmButton: false,
              allowOutsideClick: false,
              didOpen: async () => {
                setTimeout(() => {
                  Swal.close();
                }, 1000);
              },
            });
          }
        },
      });
    }
  };

  const handleChangeAvatar = async (e) => {
    const { files } = e.target;
    if (e.target.files.length === 0) return;

    await handleStudentProfile.changeAvatar(
      files[0],
      teacher,
      dispatch,
      dispatch_auth
    );
  };

  return (
    <div className={`info-teacher ${className}`}>
      {info_store.loading ? (
        <div className="info-teacher__loading">
          <i className="icon fa fa-spinner fa-pulse fa-4x fa-fw"></i>
        </div>
      ) : (
        <>
          <div className="left-block">
            <div
              className="left-block__avatar"
              style={{
                backgroundImage: `url("${teacher.srcImage}")`,
              }}
            >
              <div
                className="avatar__change"
                onClick={() => {
                  file.current.click();
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChangeAvatar}
                  ref={file}
                  hidden
                ></input>
                <i className="icon fa fa-camera fa-lg" aria-hidden="true"></i>
              </div>
            </div>

            <div className="cover-block-left">
              <form
                onSubmit={handleSubmit(onSubmitUpdateInfo)}
                className="left-block__form-group"
              >
                <div className="form-item">
                  <label className="form-item__label">
                    Họ & Tên:{" "}
                    <input
                      className="form-item__input"
                      {...register("name")}
                    ></input>
                  </label>
                  <label className="form-item__label">
                    Chuyên môn:{" "}
                    <input
                      className="form-item__input"
                      {...register("major")}
                    ></input>
                  </label>
                </div>
                <div className="form-item">
                  <label className="form-item__label">
                    Hộp thư:{" "}
                    <input
                      readOnly="true"
                      className="form-item__input"
                      {...register("email")}
                    ></input>
                  </label>
                  <label className="form-item__label">
                    SDT:{" "}
                    <input
                      className="form-item__input"
                      {...register("phone")}
                    ></input>
                  </label>
                </div>
                <input type="submit" hidden ref={submit}></input>
              </form>
              <div className="left-block__btn ">
                <Button
                  className="btn-smaller btn--hover-change-color"
                  content="Cập nhật"
                  onClick={() => {
                    submit.current.click();
                  }}
                ></Button>
              </div>
            </div>
          </div>
          <div className="right-block">
            <NavTab
              className="tabs-style--fill right-block__tabs tabs-content--flex-height-full"
              headers={["Giới thiệu", "Kỹ năng"]}
              blocks={[
                <div className="tabs__text-area">
                  <Editor
                    editorState={info_store.introEditor}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    placeholder="Giới thiệu bản thân"
                    onEditorStateChange={updateIntroEditor}
                  />
                </div>,
                <div className="tabs__text-area">
                  <Editor
                    editorState={info_store.techniqueEditor}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    placeholder="Kỹ năng bản thân"
                    onEditorStateChange={updateTechniqueEditor}
                  />
                </div>,
              ]}
            ></NavTab>
          </div>
        </>
      )}
    </div>
  );
};
