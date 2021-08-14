// @flow
import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import slugify from "slugify";

const configSlug = (url) => {
  return slugify(url, {
    locale: "vi",
    lower: true,
  });
};
export const UserAccount = ({ account, handlelogout }) => {
  return (
    <div className="user-account">
      <div className="user-account__header">
        <div className="header__info">
          <p className="account-info__name">{account.name}</p>
          <p className="account-info__role">{account.role}</p>
        </div>
        {account.srcImage && (
          <div
            className="header__image"
            style={{
              backgroundImage: `url("${account.srcImage}")`,
            }}
          ></div>
        )}
        <div className="user-account__options">
          {(() => {
            switch (account.permission) {
              case 0:
                //admin
                return (
                  <>
                    <Link
                      className="option__item"
                      to={`/accounts/${configSlug(account.name || "")}`}
                    >
                      <i className="icon fa fa-info" aria-hidden="true"></i>
                      Quản lý cá nhân
                    </Link>
                    <Link
                      className="option__item"
                      to={`/admins/${configSlug(account.name || "")}`}
                    >
                      <i className="icon fa fa-cog" aria-hidden="true"></i>
                      Trang chủ quản trị viên
                    </Link>
                  </>
                );
              case 1:
                //teacher
                return (
                  <>
                    <Link
                      className="option__item"
                      to={`/accounts/${configSlug(account.name || "")}`}
                    >
                      <i className="icon fa fa-info" aria-hidden="true"></i>
                      Quản lý cá nhân
                    </Link>
                    <Link
                      className="option__item"
                      to={`/teachers/dashboard/${configSlug(
                        account.name || ""
                      )}`}
                    >
                      <i className="icon fa fa-home" aria-hidden="true"></i>
                      Trang chủ giảng viên
                    </Link>
                  </>
                );
              case 2:
                //student
                return (
                  <>
                    <Link
                      className="option__item"
                      to={`/accounts/${configSlug(account.name || "")}`}
                    >
                      <i className="icon fa fa-info" aria-hidden="true"></i>
                      Quản lý cá nhân
                    </Link>
                  </>
                );
              default:
                break;
            }
          })()}
          <hr></hr>
          <div className="option__item" onClick={handlelogout}>
            <i className="icon fa fa-sign-out" aria-hidden="true"></i>Thoát
          </div>
        </div>
      </div>
    </div>
  );
};
