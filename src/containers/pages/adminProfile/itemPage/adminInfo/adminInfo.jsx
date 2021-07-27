// @flow
import React, { useReducer, useEffect, useContext, useRef } from "react";
import {
  Button,
  FieldText,
  RadioButton,
  Modal,
} from "../../../../../components";
import "./style.scss";
import { authContext } from "../../../../../contexts/auth/authContext";
import { useForm } from "react-hook-form";
import { reducer, ADMIN_INFO_ACTION, enumState } from "./reducer/reducer";
import { handleAdminInfo } from "./middlewares/handleAdminInfo";
import { ChangePasswordForm } from "../../../studentProfile/itemInfo";

const inidData = {
  active: "mini-show",
  modalState: enumState.HIDDEN,
  error: {
    name: {
      isShow: false,
      message: "*Hiện đang trống thông tin",
    },
    emailName: {
      isShow: false,
      message: "*Hiện đang trống thông tin",
    },
    oldPassword: {
      isShow: false,
      message: "* Thông tin không được để trống!!",
    },
    newPassword: {
      isShow: false,
      message: "* Thông tin không được để trống!!",
    },
    confirmNewPassword: {
      isShow: false,
      message: "* Thông tin không được để trống!!",
    },
  },
};

export const AdminInfo = ({ account, adminProfileDispatch }) => {
  const [store, dispatch] = useReducer(reducer, inidData);
  const { dispatch_auth } = useContext(authContext);
  const avatar = useRef();
  const form = useRef();
  const { register, setValue, getValues } = useForm();

  useEffect(() => {
    if (Object.keys(account).length) {
      ["name", "phone", "email", "gender"].map((item) => {
        setValue(
          item,
          typeof account[item] === "number" ? +account[item] : account[item]
        );
      });
    }
  }, [account]);

  const handleChangeAvatar = async (e) => {
    if (e.target.files.length === 0) return;

    handleAdminInfo.changeAvatar(account, e.target.files[0], dispatch_auth);
  };

  const handleCancelUpdate = async () => {
    const result = await handleAdminInfo.checkCancelUpdate(dispatch);

    if (!result) {
      form.current.reset();
      return;
    }

    if (handleAdminInfo.validateField(getValues(), dispatch)) return;
    handleAdminInfo.updateInfoAccount(account.id, getValues(), dispatch_auth);
  };

  return (
    <div className={`admin-info ${store.active}`}>
      <div className="admin-info__content">
        <div className="content-view">
          <div className="content-view__image">
            {account.srcImage && <img src={`${account.srcImage}`}></img>}
            <input
              type="file"
              ref={avatar}
              onChange={handleChangeAvatar}
              hidden
            ></input>
            <div
              className="image__change-avatar"
              onClick={() => {
                avatar.current.click();
              }}
            >
              <i className="icon fa fa-camera" aria-hidden="true"></i>
            </div>
          </div>
          <div className="content-view__info">
            <p className="info__name">{account.name}</p>
            <p className="info__email">{account.email}</p>
            <p className="info__role">
              <i className="icon fa fa-user-circle-o" aria-hidden="true"></i>
              Quản trị viên
            </p>
          </div>
          <Button
            className="content-view__btn-edit btn--square btn--hover-horizontal-change-color"
            bodyClassName="btn-edit__body"
            content="Chỉnh sửa"
            onClick={() => {
              dispatch({
                type: ADMIN_INFO_ACTION.UPDATE_ACTIVE,
                payload: "show-full",
              });
            }}
          ></Button>
        </div>
        <div className="content-edit">
          <div className="content-edit__header">
            <p>Thông tin tài khoản</p>
          </div>
          <form ref={form} className="content-edit__body">
            <FieldText
              placeHolder="Họ & tên"
              label="Họ & tên"
              name="name"
              defaultValue={account.name}
              register={register}
              error={store.error.name}
            ></FieldText>
            <FieldText
              placeHolder="Email"
              label="Email"
              name="email"
              defaultValue={account.email}
              register={register}
              readOnly={true}
              error={store.error.email}
            ></FieldText>
            <FieldText
              placeHolder="Số điện thoại"
              label="Số điện thoại"
              name="phone"
              defaultValue={account.phone}
              register={register}
            ></FieldText>
            <div className="body__change-password">
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
                    type: ADMIN_INFO_ACTION.MODAL_OPEN,
                  });
                }}
              >
                Đổi mật khẩu
              </div>
              <Modal
                state={store.modalState}
                onClickOverlay={() => {
                  dispatch({
                    type: ADMIN_INFO_ACTION.MODAL_CLOSE,
                  });
                }}
              >
                <ChangePasswordForm
                  info={account}
                  error={store.error}
                  dispatch={dispatch}
                ></ChangePasswordForm>
              </Modal>
            </div>
            <RadioButton
              items={["Nam", "Nữ", "Khác"]}
              value={account.gender}
              onChange={(e) => {
                setValue("gender", +e.target.value);
              }}
            ></RadioButton>
          </form>
          <div className="content-edit__btn-group">
            <Button
              className="admin-info__btn-edit btn--color-white "
              content="Đóng"
              onClick={handleCancelUpdate}
            ></Button>
            <Button
              content="Cập nhật"
              className="btn--hover-change-color"
              onClick={() => {
                handleAdminInfo.updateInfoAccount(
                  account.id,
                  getValues(),
                  dispatch_auth
                );
              }}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
