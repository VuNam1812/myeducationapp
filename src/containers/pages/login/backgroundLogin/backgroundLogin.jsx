// @flow
import * as React from "react";
import "./style.scss";
import loginImg from "../../../../public/image/login.png";
import { useHistory } from "react-router-dom";
import { Logo } from "../../../../components";
export const BackgroundLogin = (props) => {
  const history = useHistory();
  return (
    <>
      <Logo
        className="logo--shadow background-login__logo"
        onClick={() => {
          history.push("/");
        }}
      ></Logo>
      <div className="background-login">
        <div className="background-login__clip-path"></div>
        <div className="background-login__image">
          <img src={loginImg}></img>
          <p className='image__text-title'>
            Điều tuyệt với nhất của việc học là không một ai có thể lấy nó từ
            bạn!
          </p>
        </div>
      </div>
    </>
  );
};
