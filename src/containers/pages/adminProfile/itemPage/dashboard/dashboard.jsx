// @flow
import * as React from "react";
import "./style.scss";
import courseImage from "../../../../../public/image/icon/online-course.png";
import cateImage from "../../../../../public/image/icon/categories.png";
import accountImage from "../../../../../public/image/icon/teamwork.png";

const ACTION = {
  ACTIVE_DASHBOARD: 1,
  ACTIVE_COURSES: 2,
  ACTIVE_CATEGORIES: 3,
  ACTIVE_ACCOUNTS: 4,
};

export const Dashboard = (props) => {
  return (
    <div className="dashboard">
      <p className="dashboard__welcome">
        Chào bạn Admin,<br></br>
        Bạn mong muốn theo dõi gì bây giờ?
      </p>
      <div className="dashboard__card">
        <div
          className="card__item"
          onClick={() => {
            props.dispatch({
              type: ACTION.ACTIVE_COURSES,
            });
          }}
        >
          <div className="card__item-image">
            <img src={courseImage}></img>
          </div>
          <p className="card__item-title">Khóa học</p>
        </div>
        <div
          className="card__item"
          onClick={() => {
            props.dispatch({
              type: ACTION.ACTIVE_CATEGORIES,
            });
          }}
        >
          <div className="card__item-image">
            <img src={cateImage}></img>
          </div>
          <p className="card__item-title">Danh mục</p>
        </div>
        <div
          className="card__item"
          onClick={() => {
            props.dispatch({
              type: ACTION.ACTIVE_ACCOUNTS,
            });
          }}
        >
          <div className="card__item-image">
            <img src={accountImage}></img>
          </div>
          <p className="card__item-title">Tài khoản</p>
        </div>
      </div>
    </div>
  );
};
