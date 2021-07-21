// @flow
import React, { useReducer, useEffect, useContext } from "react";
import { BackgroundLogin } from "./backgroundLogin/backgroundLogin";
import { LoginForm } from "./loginForm/loginForm";
import "./style.scss";
import { handleAction } from "./middlewares/handleActionLogin";
import { authContext } from "../../../contexts/auth/authContext";
import { useHistory } from "react-router-dom";
import { reducer } from "./reducer/loginReducer";
import $ from "jquery";
const initData = {
  login: {},
  error: {
    email: {
      isShow: false,
      message: "*Vui lòng nhập dữ liệu!",
    },
    password: {
      isShow: false,
      message: "*Vui lòng nhập dữ liệu!",
    },
  },
};

export const Login = (props) => {
  const [store, dispatch] = useReducer(reducer, initData);
  const history = useHistory();
  const { dispatch_auth } = useContext(authContext);
  useEffect(() => {
    if (store.login.password && store.login.email) {
      handleAction.checkLogin(store.login, dispatch_auth, history);
    }
  }, [store.login]);

  useEffect(() => {
    $("html,body").animate({ scrollTop: 0 }, 500);
  }, []);

  return (
    <div className="login">
      <BackgroundLogin></BackgroundLogin>
      <div className="login-body">
        <div className="wrap">
          <LoginForm dispatch={dispatch} store={store}></LoginForm>
        </div>
      </div>
    </div>
  );
};
