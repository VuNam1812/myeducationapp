// @flow
import React, { useRef } from "react";
import "./style.scss";
import { OrtherLogin } from "../../../itemsPage";
import { Checkbox, InputWithLabel, Button } from "../../../../components";
import { handleValidate } from "../middlewares/handleValidateLogin";
import { handleAction } from "../middlewares/handleActionLogin";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
export const LoginForm = (props) => {
  const { register, handleSubmit } = useForm();
  const submit = useRef();

  const onSubmitLogin = (data) => {
    if (!handleValidate.validateAll(data, props.dispatch)) return;
    handleAction.updateStoreLogin(data, props.dispatch);
  };

  return (
    <div className="login-form">
      <h1 className="login-form__title">Đăng nhập</h1>
      <h3 className="login-form__desc">
        <span>Xin chào!</span> Hãy xác nhận rằng bạn đã từng ghé qua
      </h3>
      <form
        onSubmit={handleSubmit(onSubmitLogin)}
        className="login-form__body-main"
      >
        <InputWithLabel
          register={register}
          name="email"
          className="input--shadow"
          labelName="Email"
          type="text"
          error={{
            isShow: props.store.error.email.isShow,
            message: props.store.error.email.message,
          }}
        ></InputWithLabel>
        <InputWithLabel
          register={register}
          name="password"
          className="input--shadow"
          labelName="Mật khẩu"
          type="password"
          error={{
            isShow: props.store.error.password.isShow,
            message: props.store.error.password.message,
          }}
        ></InputWithLabel>
        <input type="submit" ref={submit} hidden></input>
        <div className="option-login">
          <div className="option-login__remember">
            <Checkbox className="option-login__remember-input checkbox-basic"></Checkbox>
            <p className="option-login__remember-text">Nhớ mật khẩu</p>
          </div>
          <p className="option-login__forget-password">Quên mật khẩu?</p>
        </div>
        <Button
          className="btn--hover-vertical-change-color"
          content="Đăng nhập"
          onClick={() => {
            submit.current.click();
          }}
        ></Button>
      </form>
      <OrtherLogin></OrtherLogin>
      <p className="login-form__register">
        Người dùng mới? <Link to="/register">Đăng ký</Link>
      </p>
    </div>
  );
};
