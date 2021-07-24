// @flow
import React from "react";
import iconGoogle from "../../../public/image/icon/google.png";
import iconFacebook from "../../../public/image/icon/facebook.png";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import "./style.scss";
export const OrtherLogin = (props) => {
  const responseLoginFacebook = (res) => {
    console.log(res);
  };

  const responseLoginGoogle = (res) => {
    console.log(res.profileObj);
  };

  return (
    <div className="orther-login">
      <h4 className="orther-login__title">Hoặc</h4>
      <div className="orther-login__btn-groups">
        <FacebookLogin
          appId="1142560372925886"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseLoginFacebook}
          render={(renderProps) => (
            <div
              onClick={renderProps.onClick}
              className="btn-groups__item"
              style={{ backgroundImage: `url(${iconFacebook})` }}
            ></div>
          )}
        ></FacebookLogin>
        <GoogleLogin
          clientId="311192668751-q4t4q17qf3imckc9ajnuu5el53mtd47e.apps.googleusercontent.com"
          onSuccess={responseLoginGoogle}
          render={(renderProps) => (
            <div
              onClick={renderProps.onClick}
              className="btn-groups__item"
              style={{ backgroundImage: `url(${iconGoogle})` }}
            ></div>
          )}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};
