// @flow
import React, { useState, useEffect, useContext } from "react";
import "./style.scss";
import { Logo } from "../../../../../components";
import { ADMIN_PROFILE_ACTION } from "../../reducer/reducer";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
export const NavPage = (props) => {
  const [active, setActive] = useState(
    new Array(4).fill(null).map((item, index) => (index === 0 ? "active" : ""))
  );
  const history = useHistory();

  useEffect(() => {
    setActive(
      new Array(4)
        .fill(null)
        .map((item, index) =>
          index === props.activeItem.currectActive - 1 ? "active" : ""
        )
    );
  }, [props.activeItem.currectActive]);

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
      await props.logoutUser();
    }
  };

  return (
    <div className="nav-page">
      <div className="nav-page__logo">
        <Logo
          className="logo--shadow"
          onClick={() => {
            history.push("/");
          }}
        ></Logo>
      </div>
      <div className="nav-page__fix">
        <div className="nav-group">
          <span
            className={`nav-group__item ${active[0]}`}
            onClick={(e) => {
              props.dispatch({
                type: ADMIN_PROFILE_ACTION.ACTIVE_DASHBOARD,
              });
            }}
          >
            <i className="icon fa fa-home" aria-hidden="true"></i>
          </span>
          <span
            className={`nav-group__item ${active[1]}`}
            onClick={(e) => {
              props.dispatch({
                type: ADMIN_PROFILE_ACTION.ACTIVE_COURSES,
              });
            }}
          >
            <i className="icon fa fa-graduation-cap" aria-hidden="true"></i>
          </span>
          <span
            className={`nav-group__item ${active[2]}`}
            onClick={(e) => {
              props.dispatch({
                type: ADMIN_PROFILE_ACTION.ACTIVE_CATEGORIES,
              });
            }}
          >
            <i className="icon fa fa-th-large" aria-hidden="true"></i>
          </span>
          <span
            className={`nav-group__item ${active[3]}`}
            onClick={(e) => {
              props.dispatch({
                type: ADMIN_PROFILE_ACTION.ACTIVE_ACCOUNTS,
              });
            }}
          >
            <i className="icon fa fa-user" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      <div className="nav-page__logout-btn" onClick={handleLogoutAccount}>
        <p>
          <i className="icon fa fa-sign-out fa-2x" aria-hidden="true"></i>
        </p>
      </div>
    </div>
  );
};
