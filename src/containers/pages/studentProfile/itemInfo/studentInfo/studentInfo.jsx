// @flow
import React, { useRef } from "react";
import { Button } from "../../../../../components";
import "./style.scss";
import { STUDENT_PROFILE_ACTION } from "../../reducer/reducer";
import { handleStudentProfile } from "../../middleware/handleStudentProfile";
export const StudentInfo = ({ info, dispatch, dispatchAuth }) => {
  const avatar = useRef();

  const handleChangeAvatar = async (e) => {
    const { files } = e.target;
    if (e.target.files.length === 0) return;
    await handleStudentProfile.changeAvatar(
      files[0],
      info,
      dispatch,
      dispatchAuth
    );
  };

  return (
    <div className="student-info">
      <div className="avatar">
        <img src={info.srcImage}></img>
        <input
          ref={avatar}
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleChangeAvatar}
          hidden
        ></input>
        <div
          className="btn-change-image"
          onClick={() => {
            avatar.current.click();
          }}
        >
          <i className="fa fa-camera" aria-hidden="true"></i>
        </div>
      </div>
      <div className="info">
        <p className="info__name">{info.name}</p>
        <p className="info__email">{info.email}</p>
        <p className="info__role">
          <i className="fa fa-graduation-cap icon" aria-hidden="true"></i>
          {info.role}
        </p>
      </div>
      <div className="student-contact">
        <i className="icon fa fa-2x fa-facebook-square" aria-hidden="true"></i>
        <i className="icon fa fa-2x fa-twitter-square" aria-hidden="true"></i>
        <i className="icon fa fa-2x fa-linkedin-square" aria-hidden="true"></i>
        <i className="icon fa fa-2x fa-github" aria-hidden="true"></i>
      </div>
      <Button
        className="btn-edit-profile btn--hover-change-color"
        content="Thông tin cá nhân"
        onClick={() => {
          dispatch({
            type: STUDENT_PROFILE_ACTION.UPDATE_ACTIVE,
            payload: 2,
          });
        }}
      ></Button>
      <div className="cover--bottom"></div>
    </div>
  );
};
