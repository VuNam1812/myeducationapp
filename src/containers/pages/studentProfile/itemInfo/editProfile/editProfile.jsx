// @flow
import React, { useEffect, useState } from "react";
import { Button, FieldText, RadioButton } from "../../../../../components";
import "./style.scss";
import { STUDENT_PROFILE_ACTION } from "../../reducer/reducer";
import { useForm } from "react-hook-form";
import { useRef } from "react";

import { handleEditProfile } from "../../middleware/handleEditProfile";

export const EditProfile = ({
  authDispatch,
  error,
  info,
  dispatch,
  className,
}) => {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [gender, setGender] = useState(info.gender);
  const submit = useRef();
  const form = useRef();
  const onSubmitLogin = async (data, e) => {
    if (
      handleEditProfile.checkAllField(
        data,
        info.email.length ? true : false,
        dispatch
      )
    )
      return;
    if (
      info.email.length &&
      (await handleEditProfile.checkEmailExist(data, dispatch))
    )
      return;
    await handleEditProfile.updateAccount(info, data, dispatch, authDispatch);

    dispatch({
      type: STUDENT_PROFILE_ACTION.UPDATE_ACTIVE,
      payload: 1,
    });
  };

  const handleCancelBtn = async () => {
    const result = await handleEditProfile.confirmCancel();
    if (!result) {
      form.current.reset();
      setGender(info.gender);
    } else {
      if (handleEditProfile.checkAllField(getValues(), dispatch)) return;
      await handleEditProfile.updateAccount(
        info,
        getValues(),
        dispatch,
        authDispatch
      );
    }

    dispatch({
      type: STUDENT_PROFILE_ACTION.UPDATE_ACTIVE,
      payload: 1,
    });
  };

  useEffect(() => {
    ["name", "phone", "email", "gender"].map((item) => {
      setValue(`${item}`, info[item] ? info[item] : "");
    });

    setGender(+info.gender);
  }, [info]);

  return (
    <div className={`edit-profile ${className}`}>
      <div className="edit-profile__header">Thông tin tài khoản</div>
      <form
        ref={form}
        onSubmit={handleSubmit(onSubmitLogin)}
        className="edit-profile__form-group"
      >
        <FieldText
          placeHolder="Họ & tên đệm"
          label="Họ & tên"
          name="name"
          type="text"
          defaultValue={info.name}
          error={error.name}
          register={register}
        ></FieldText>
        <FieldText
          placeHolder="Số điện thoại"
          label="Số điện thoại"
          name="phone"
          defaultValue={info.phone}
          register={register}
        ></FieldText>
        {info.email?.length ? (
          <FieldText
            placeHolder="Hộp thư"
            label="Hộp thư"
            name="email"
            error={error.email}
            defaultValue={info.email}
            readOnly={true}
            register={register}
          ></FieldText>
        ) : (
          <></>
        )}
        {info.facebookId?.length + info.googleId?.length === 0 ? (
          <>
            <div className="change-password">
              <FieldText
                placeHolder="Mật khẩu"
                label="Mật khẩu"
                type="password"
                defaultValue="******************"
                readOnly={true}
              ></FieldText>
              <div
                className="change-password__link"
                onClick={() => {
                  dispatch({
                    type: STUDENT_PROFILE_ACTION.MODAL_OPEN,
                  });
                }}
              >
                Đổi mật khẩu
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <input
          type="number"
          defaultValue={info.gender}
          {...register("gender")}
          hidden
        ></input>
        <RadioButton
          items={["Nam", "Nữ", "Khác"]}
          value={gender}
          onChange={(e) => {
            setValue("gender", +e.target.value);
            setGender(+e.target.value);
          }}
        ></RadioButton>
        <input type="submit" ref={submit} hidden></input>
      </form>
      <div className="btn-groups-edit">
        <div className="edit-profile__btn-controls">
          <Button
            className="btn--color-white"
            content="Quay lại"
            onClick={handleCancelBtn}
          ></Button>
          <Button
            className="btn--hover-change-color"
            content="Cập nhật"
            onClick={() => {
              submit.current.click();
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};
