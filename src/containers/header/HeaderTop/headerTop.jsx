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
          <p className="header-top__item-title">Call Us</p>
          <p className="header-top__item-info">+1 (800) 123-4567</p>
        </div>
        <div className="header-top__item">
          <p className="header-top__item-title">Email Us</p>
          <p className="header-top__item-info">info@mycompany.com</p>
        </div>
        <div className="btn-log">
          <Button
            className="btn--none"
            content="Log in"
            onClick={() => {
              history.push("/login");
            }}
          ></Button>
          <Button
            className="btn--main btn--hover-change-color"
            content="Register"
            onClick={() => {
              history.push("/register");
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};
