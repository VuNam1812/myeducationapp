// @flow
import React, { useReducer, useRef } from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import { reducer, ACTION } from "./reducer";
import { Link } from "react-router-dom";
import { handleValidate } from "./handleValidate";
import { InputWithLabel, Button, RadioButton } from "../../../../components";
import { OrtherLogin } from "../../../itemsPage/ortherLogin/ortherLogin";
const initData = {
  name: {
    show: false,
    message: "*Vui lòng nhập dữ liệu!",
  },
  email: {
    show: false,
    message: "*Vui lòng nhập dữ liệu!",
  },
  password: {
    show: false,
    message: "*Vui lòng nhập dữ liệu!",
  },
  confirmPassword: {
    show: false,
    message: "*Vui lòng nhập dữ liệu!",
  },
};

export const RegisterForm = (props) => {
  const { register, handleSubmit } = useForm();
  const [error, dispatch_error] = useReducer(reducer, initData);
  const submit = useRef();

  const onSubmitForm = async (data) => {
    if (!handleValidate.validateAll(data, dispatch_error)) return;
    if (!handleValidate.validateConfirmPassword(data, dispatch_error)) return;
    if (!handleValidate.validateGender(props.store.account.gender)) return;
    if (!(await handleValidate.validateEmail(data.email, dispatch_error)))
      return;
    delete data.confirmPassword;

    props.dispatch({
      type: props.action.UPDATE_DATA,
      payload: data,
    });
  };
  return (
    <div className={`register-form ${props.className}`}>
      <h1 className="register-form__title">Đăng ký</h1>
      <h3 className="register-form__desc">
        <span>Xin chào!</span> Hãy xác nhận rằng bạn đã từng ghé qua
      </h3>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="register-form__body-main"
      >
        <InputWithLabel
          placeHolder="Họ & tên"
          name="name"
          register={register}
          className="input--shadow"
          labelName="Họ & tên"
          type="text"
          error={{
            isShow: error.name.show,
            message: error.name.message,
          }}
        ></InputWithLabel>

        <InputWithLabel
          placeHolder="Địa chỉ hộp thư"
          name="email"
          register={register}
          className="input--shadow"
          labelName="Địa chỉ hộp thư"
          type="text"
          error={{
            isShow: error.email.show,
            message: error.email.message,
          }}
        ></InputWithLabel>
        <InputWithLabel
          placeHolder="+84 900 000 0000"
          name="phone"
          register={register}
          className="input--shadow"
          labelName="Số điện thoại"
          type="text"
        ></InputWithLabel>
        <InputWithLabel
          placeHolder="Mật khẩu"
          name="password"
          register={register}
          className="input--shadow"
          labelName="Mật khẩu"
          type="password"
          error={{
            isShow: error.password.show,
            message: error.password.message,
          }}
        ></InputWithLabel>
        <InputWithLabel
          placeHolder="Nhập lại mật khẩu"
          name="confirmPassword"
          register={register}
          className="input--shadow"
          labelName="Nhập lại mật khẩu"
          type="password"
          error={{
            isShow: error.confirmPassword.show,
            message: error.confirmPassword.message,
          }}
        ></InputWithLabel>

        <RadioButton
          className="gender"
          items={["Nam", "Nữ", "Khác"]}
          value={-1}
          onChange={(e) => {
            props.dispatch({
              type: props.action.UPDATE_GENDER,
              payload: +e.target.value,
            });
          }}
        ></RadioButton>
        <input ref={submit} type="submit" hidden></input>
        <Button
          className="btn--hover-horizontal-change-color"
          content="Đăng ký"
          onClick={() => {
            submit.current.click();
          }}
        ></Button>
      </form>
      <p className="register-form__register">
        Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
};
