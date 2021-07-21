// @flow
import React, { useReducer, useRef, useEffect } from "react";
import { NavTab, Button, Modal, FieldText } from "../../../../../components";
import "./style.scss";
import { reducer, enumState, ACCOUNT_ADMIN_ACTION } from "./reducer/reducer";
import { handleAdminAccount } from "./middlewares/handleAdminCategory";
import { useForm } from "react-hook-form";

const initData = {
  modalState: enumState.HIDDEN,
  loading: true,
  error: {
    firstName: {
      isShow: false,
      message: "*Hiện đang chưa có dữ liệu",
    },
    lastName: {
      isShow: false,
      message: "*Hiện đang chưa có dữ liệu",
    },
    email: {
      isShow: false,
      message: "*Hiện đang chưa có dữ liệu",
    },
    password: {
      isShow: false,
      message: "*Hiện đang chưa có dữ liệu",
    },
  },
};

export const Accounts = ({ teachers, users, adminProfileDispatch }) => {
  const [store, dispatch] = useReducer(reducer, initData);
  const { register, handleSubmit, setValue } = useForm();
  const form = useRef();
  const submit = useRef();

  useEffect(() => {
    dispatch({
      type: ACCOUNT_ADMIN_ACTION.UPDATE_LOADING,
      payload: true,
    });
    setTimeout(() => {
      dispatch({
        type: ACCOUNT_ADMIN_ACTION.UPDATE_LOADING,
        payload: false,
      });
    }, 1500);
  }, []);

  const handleCreateAccountModal = () => {
    form.current.reset();
    setValue("password", "");
    dispatch({
      type: ACCOUNT_ADMIN_ACTION.MODAL_OPEN,
    });
  };

  const onCreateAccount = async (data) => {
    if (!handleAdminAccount.validateAll(data, dispatch)) return;
    if (await handleAdminAccount.validEmailExists(data, dispatch)) return;

    const result = await handleAdminAccount.createAccountTeacher(
      data,
      adminProfileDispatch
    );

    if (result) {
      dispatch({
        type: ACCOUNT_ADMIN_ACTION.MODAL_CLOSE,
      });
    }
  };

  return (
    <div className="account-manager">
      <NavTab
        headers={["Giảng viên", "Học viên"]}
        blocks={[
          store.loading ? (
            <div className="account-manager__loading">
              <i className="icon fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            </div>
          ) : (
            <div className="accounts-list">
              <div className="flex-block">
                <Modal
                  state={store.modalState}
                  onClickOverlay={() => {
                    dispatch({
                      type: ACCOUNT_ADMIN_ACTION.MODAL_CLOSE,
                    });
                  }}
                >
                  <div className="modal-create-account">
                    <div className="modal-create-account__header">
                      <h3 className="header__create-account-title">
                        Tạo tài khoản
                      </h3>
                    </div>
                    <div className="modal-create-account__content">
                      <form
                        onSubmit={handleSubmit(onCreateAccount)}
                        ref={form}
                        className="content-create-account__form"
                      >
                        <div className="block-flex">
                          <FieldText
                            placeHolder="Họ"
                            label="Họ"
                            name="firstName"
                            register={register}
                            className="field--none-rounded"
                            error={store.error.firstName}
                          ></FieldText>
                          <FieldText
                            placeHolder="Tên"
                            label="Tên"
                            name="lastName"
                            register={register}
                            className="field--none-rounded"
                            error={store.error.lastName}
                          ></FieldText>
                        </div>
                        <FieldText
                          placeHolder="Email"
                          label="Email"
                          name="email"
                          register={register}
                          className="field--none-rounded"
                          error={store.error.email}
                        ></FieldText>
                        <FieldText
                          placeHolder="Ngày sinh"
                          label="Ngày sinh"
                          name="dob"
                          type="date"
                          register={register}
                          className="field--none-rounded"
                          defaultValue={new Date()}
                        ></FieldText>
                        <FieldText
                          placeHolder="Vai trò"
                          label="Vai trò"
                          className="field--none-rounded"
                          defaultValue="Giảng viên"
                          readOnly={true}
                        ></FieldText>
                        <FieldText
                          placeHolder="Mật khẩu"
                          label="Mật khẩu"
                          className="field--none-rounded"
                          type="password"
                          onBlur={(e) => {
                            setValue("password", e.target.value);
                          }}
                          error={store.error.password}
                        ></FieldText>

                        <input type="submit" ref={submit} hidden></input>
                      </form>
                    </div>
                    <div className="modal-create-account__footer">
                      <Button
                        className="btn--hover-change-color"
                        content="Tạo tài khoản"
                        onClick={() => {
                          submit.current.click();
                        }}
                      ></Button>
                    </div>
                  </div>
                </Modal>
                <p className="accounts-list__title">Danh sách giảng viên</p>
                <Button
                  onClick={handleCreateAccountModal}
                  content="Thêm giảng viên"
                  className="btn-smaller accounts-list__add-btn btn--hover-vertical-change-color"
                ></Button>
              </div>
              <div className="accounts-list__group">
                {teachers.map((teacher) => {
                  return (
                    <div
                      className={`accounts-group__item ${
                        teacher.status === 0 ? "disable" : ""
                      }`}
                    >
                      {teacher.srcImage && (
                        <div
                          className="item__image"
                          style={{
                            backgroundImage: `url("${teacher.srcImage}")`,
                          }}
                        ></div>
                      )}
                      <div className="item__info">
                        <p className="item__info-name">{`${teacher.firstName} ${teacher.lastName}`}</p>
                        <p className="item__info-courses">
                          <span>{teacher.courseCount}</span> khóa học
                        </p>
                      </div>
                      <div
                        className="item__btn-lock"
                        onClick={() => {
                          handleAdminAccount.activeAccount(
                            teacher,
                            adminProfileDispatch
                          );
                        }}
                      >
                        <i
                          className={`icon fa fa-${
                            teacher.status === 0 ? "lock" : "unlock-alt"
                          }`}
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ),
          !store.loading && (
            <div className="accounts-list">
              <p className="accounts-list__title">Danh sách học viên</p>
              <div className="accounts-list__group">
                {users.map((user) => {
                  return (
                    <div
                      className={`accounts-group__item ${
                        user.status === 0 ? "disable" : ""
                      }`}
                    >
                      {user.srcImage && (
                        <div
                          className="item__image"
                          style={{
                            backgroundImage: `url("${user.srcImage}")`,
                          }}
                        ></div>
                      )}
                      <div className="item__info">
                        <p className="item__info-name">{`${user.firstName} ${user.lastName}`}</p>
                        <p className="item__info-courses">
                          <span>{user.paidCourseCount}</span> khóa học
                        </p>
                      </div>
                      <div
                        className="item__btn-lock"
                        onClick={() => {
                          handleAdminAccount.activeAccount(
                            user,
                            adminProfileDispatch
                          );
                        }}
                      >
                        <i
                          className={`icon fa fa-${
                            user.status === 0 ? "lock" : "unlock-alt"
                          }`}
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ),
        ]}
      ></NavTab>
    </div>
  );
};
