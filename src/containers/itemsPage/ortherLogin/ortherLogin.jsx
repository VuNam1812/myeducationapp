// @flow
import React, { useContext } from "react";
import iconGoogle from "../../../public/image/icon/google.png";
import iconFacebook from "../../../public/image/icon/facebook.png";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";
import { handleAction } from "../../pages/login/middlewares/handleActionLogin";
import "./style.scss";
import { authContext } from "../../../contexts/auth/authContext";
const googleId =
  "311192668751-q4t4q17qf3imckc9ajnuu5el53mtd47e.apps.googleusercontent.com";
const facebookId = "1142560372925886";

export const OrtherLogin = (props) => {
  const { dispatch_auth } = useContext(authContext);
  const history = useHistory();
  const responseLoginFacebook = (res) => {
    if (res.status && res.status === "unknown") {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Đăng nhập không thành công.",
        showConfirmButton: false,
        didOpen: async () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });
      return;
    }

    handleAction.checkLogin(
      {
        access_token: res.accessToken,
        userID: res.userID,
        name: res.name,
      },
      "facebook",
      dispatch_auth,
      history
    );
  };

  const responseLoginGoogle = (res) => {
    handleAction.checkLogin(
      {
        userID: res.profileObj.googleId,
        name: res.profileObj.name,
        srcImage: res.profileObj.imageUrl,
        email: res.profileObj.email,
      },
      "google",
      dispatch_auth,
      history
    );
  };

  return (
    <div className="orther-login">
      <h4 className="orther-login__title">Hoặc</h4>
      <div className="orther-login__btn-groups">
        <FacebookLogin
          appId={facebookId}
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
          clientId={googleId}
          onSuccess={responseLoginGoogle}
          onFailure={responseLoginGoogle}
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
