// @flow
import React, { useEffect, useReducer, useContext } from "react";
import "./style.scss";
import { Modal } from "../../../components";
import {
  StudentInfo,
  CourseList,
  EditProfile,
  ChangePasswordForm,
} from "./itemInfo";
import $ from "jquery";

import { NavTab } from "../../../components";
import { HeaderUpper } from "../../header/HeaderUpper/headerUpper";
import { Footer } from "../../footer/footer";
import { InComing } from "../../incoming/inComing";

import { reducer, STUDENT_PROFILE_ACTION, enumState } from "./reducer/reducer";
import { handleStudentProfile } from "./middleware/handleStudentProfile";
import { authContext } from "../../../contexts/auth/authContext";

const initData = {
  active: 1,
  modalState: enumState.HIDDEN,
  account: {},
  courseFavorites: [],
  courseJoin: [],
  error: {
    name: { isShow: false, message: "* Thông tin không được để trống!!" },
    email: { isShow: false, message: "* Thông tin không được để trống!!" },
    oldPassword: {
      isShow: false,
      message: "* Thông tin không được để trống!!",
    },
    newPassword: {
      isShow: false,
      message: "* Thông tin không được để trống!!",
    },
    confirmNewPassword: {
      isShow: false,
      message: "* Thông tin không được để trống!!",
    },
  },
};

export const StudentProfile = (props) => {
  const [store, dispatch] = useReducer(reducer, initData);
  const { dispatch_auth, store_auth } = useContext(authContext);
  useEffect(() => {
    handleStudentProfile.loadProfile(store_auth.account, dispatch);
    handleStudentProfile.loadCourseJoin(store_auth.account, dispatch);
    handleStudentProfile.loadCourseFavorite(store_auth.account, dispatch);

    $("html,body").animate({ scrollTop: 0 }, 500);
  }, []);

  return (
    <>
      <HeaderUpper className="header--zoom-80"></HeaderUpper>
      <InComing></InComing>
      <div className="student-profile">
        <div className="wrap">
          <StudentInfo
            dispatchAuth={dispatch_auth}
            dispatch={dispatch}
            info={store.account}
          ></StudentInfo>
          <div className="student-profile__cover">
            <div
              className={`student-profile__course-info ${
                store.active === 1 ? "" : "active-tabs-edit"
              }`}
            >
              <NavTab
                className="tabs-content--none-shadow student-profile__tabs"
                headers={["Khóa đang học", "Khóa yêu thích"]}
                blocks={[
                  <CourseList
                    type="join"
                    courses={store.courseJoin}
                  ></CourseList>,
                  <CourseList
                    type="favorite"
                    studentProfileDispatch={dispatch}
                    courses={store.courseFavorites}
                  ></CourseList>,
                ]}
              ></NavTab>
              <EditProfile
                authDispatch={dispatch_auth}
                error={store.error}
                dispatch={dispatch}
                info={store.account}
                className="student-profile__edit"
              ></EditProfile>
            </div>
          </div>
        </div>
      </div>
      <Modal
        state={store.modalState}
        onClickOverlay={() => {
          dispatch({
            type: STUDENT_PROFILE_ACTION.MODAL_CLOSE,
          });
        }}
      >
        <ChangePasswordForm
          info={store.account}
          error={store.error}
          dispatch={dispatch}
        ></ChangePasswordForm>
      </Modal>
      <Footer></Footer>
    </>
  );
};
