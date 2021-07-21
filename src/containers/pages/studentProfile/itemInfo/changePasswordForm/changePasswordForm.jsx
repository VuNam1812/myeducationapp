// @flow
import React, { useRef } from "react";
import "./style.scss";
import { FieldText, Button } from "../../../../../components";
import { handleChangePassword } from "../../middleware/handleChangePassword";
import { useForm } from "react-hook-form";
export const ChangePasswordForm = ({ info, error, dispatch }) => {
  const { register, handleSubmit } = useForm();
  const submit = useRef();

  const onSubmitForm = async (data, e) => {
    if (!(await handleChangePassword.checkAllField(data, dispatch))) return;
    if (!(await handleChangePassword.checkOldPassword(data, dispatch))) return;
    if (!(await handleChangePassword.checkConfirmPassword(data, dispatch)))
      return;

    await handleChangePassword.updatePassword(info, data, e, dispatch);
  };

  return (
    <div className="change-password-form">
      <div className="change-password-form__header">
        <p>Thay đổi mật khẩu</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="change-password-form__group"
      >
        <FieldText
          className="field--none-rounded"
          label="Mật khẩu cũ"
          type="password"
          error={error.oldPassword}
          name="oldPassword"
          register={register}
        ></FieldText>
        <FieldText
          className="field--none-rounded"
          label="Mật khẩu mới"
          type="password"
          name="newPassword"
          register={register}
          error={error.newPassword}
        ></FieldText>
        <FieldText
          className="field--none-rounded"
          label="Nhập lại mật khẩu mới"
          type="password"
          name="confirmNewPassword"
          register={register}
          error={error.confirmNewPassword}
        ></FieldText>
        <input type="submit" ref={submit} hidden></input>
      </form>
      <div className="change-password-form__btn">
        <Button
          content="Thay đổi"
          onClick={() => {
            submit.current.click();
          }}
        ></Button>
      </div>
    </div>
  );
};
