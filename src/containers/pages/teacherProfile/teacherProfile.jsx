// @flow
import React, { useEffect, useReducer, useContext } from "react";
import { Background, InfoTeacher, CoursesOwner } from "./teacherProfileItems";
import { Logo } from "../../../components";
import "./style.scss";

import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { reducer, TEACHER_PROFILE_ACTION } from "./reducer/reducer";
import { authContext } from "../../../contexts/auth/authContext";
import { handleTeacheDashboard } from "./middlewares/handleTeacherDashboard";
const initData = {
  account: {},
  courses: [],
  active: 1,
};

export const TeacherProfile = (props) => {
  const [store, dispatch] = useReducer(reducer, initData);
  const { logoutUser } = useContext(authContext);
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    Promise.all([
      handleTeacheDashboard.loadAccount(params, dispatch),
      handleTeacheDashboard.loadCourseOwner(params, dispatch),
    ]);
  }, []);

  const updateActive = (e) => {
    dispatch({
      type: TEACHER_PROFILE_ACTION.UPDATE_ACTIVE,
      payload: +e.currentTarget.getAttribute("data-id"),
    });
  };

  const handleLogoutAccount = async () => {
    const alert = await Swal.fire({
      icon: "question",
      text: "Bạn có chắc chắn muốn đăng xuất?",
      showConfirmButton: true,
      confirmButtonText: "Xác Nhận",
      confirmButtonColor: "#00ab15",
      showCancelButton: true,
      cancelButtonText: "Hủy bỏ",
      cancelButtonColor: "#dc3545",
    });

    if (alert.isConfirmed) {
      await logoutUser();
    }
  };

  return (
    <div className="teacher-profile">
      <Background></Background>
      <div className="teacher-profile__left-content">
        <Logo
          className="logo--shadow"
          onClick={() => {
            history.push("/");
          }}
        ></Logo>
        <div className="left-content__menu ">
          <div
            className={`left-content__menu-item ${
              store.active === 1 ? "active" : ""
            }`}
            onClick={updateActive}
            data-id="1"
          >
            <i className="icon fa fa-user-circle-o" aria-hidden="true"></i>Thông
            tin
          </div>
          <div
            className={`left-content__menu-item ${
              store.active === 2 ? "active" : ""
            }`}
            onClick={updateActive}
            data-id="2"
          >
            <i className="icon fa fa-graduation-cap" aria-hidden="true"></i>Khóa
            học
          </div>
        </div>
      </div>
      <div className="teacher-profile__right-content">
        <div className="header-profile">
          <div
            className="header-profile__btn-logout"
            onClick={handleLogoutAccount}
          >
            <span>
              <i className="icon fa fa-sign-out fa-2x" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <div className="body-profile">
          <div className="body-profile__background">
            <div className="cover-flex">
              <InfoTeacher
                dispatch={dispatch}
                teacher={store.account}
                className={`body-profile__content-info ${
                  store.active === 1 ? "active" : "hidden"
                }`}
              ></InfoTeacher>
              <CoursesOwner
                account={store.account}
                courses={store.courses}
                dispatch={dispatch}
                className={`body-profile__content-courses ${
                  store.active === 2 ? "active" : "hidden"
                }`}
              ></CoursesOwner>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
