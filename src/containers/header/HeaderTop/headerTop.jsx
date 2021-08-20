// @flow
import * as React from "react";
import "./style.scss";
import { Button } from "../../../components";
import { useHistory } from "react-router-dom";
export const HeaderTop = (props) => {
  const history = useHistory();
  return (
    <div className={`header-top ${props.className}`}>
      <div className="wrap">
        <div className="header-top__item">
          <p className="header-top__item-title">Liên lạc</p>
          <p className="header-top__item-info">+(84)942-603-267</p>
        </div>
        <div className="header-top__item">
          <p className="header-top__item-title">Hộp thư</p>
          <p className="header-top__item-info">info@hcmus.myedu.com</p>
        </div>
        <div className="btn-log">
          <Button
            className="btn--none"
            content="Đăng nhập"
            onClick={() => {
              history.push("/login");
            }}
          ></Button>
          <Button
            className="btn--main btn--hover-change-color"
            content="Đăng ký"
            onClick={() => {
              history.push("/register");
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};
