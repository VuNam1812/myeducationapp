// @flow
import React, { useRef, useState } from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import verifyEmail from "../../../../public/image/verifyMail.png";
import { Button, Input } from "../../../../components";
export const Confirm = (props) => {
  const [showError, isShowError] = useState(false);
  const { register, handleSubmit } = useForm();
  const submit = useRef();
  const onSubmitForm = (data) => {
    if (data.confirmCode.length === 0) {
      isShowError(true);
      return;
    }
    isShowError(false);
    props.confirmCode(data.confirmCode);
  };
  return (
    <div className={`confirm ${props.className}`}>
      <div className="confirm__image">
        <img src={verifyEmail}></img>
      </div>
      <h1 className="confirm__title">Xác thực Email</h1>
      <h4 className="confirm__desc">
        Mã xác nhận đã được gửi đến địa chỉ Email. Kiểm tra lại Email đăng ký và
        nhập mã xác thực vào ô bên dưới
      </h4>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Input
          name="confirmCode"
          register={register}
          placeHolder="Mã xác thực"
          type="text"
          error={{ isShow: showError, message: "*Bạn chưa nhập mã xác thực!" }}
          className="confirm__input input--shadow input--center"
        ></Input>
        <input type="submit" ref={submit} hidden></input>
      </form>
      <div className="btn-group">
        <Button
          className="btn--color-white"
          content="Back"
          onClick={() => {
            props.dispatch({
              type: props.action.UPDATE_STEP,
              payload: 1,
            });
          }}
        ></Button>
        <Button
          className="btn--hover-horizontal-change-color"
          content="Confirm code"
          onClick={() => {
            submit.current.click();
          }}
        ></Button>
      </div>
    </div>
  );
};
