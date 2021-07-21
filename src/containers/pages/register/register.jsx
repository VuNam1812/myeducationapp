// @flow
import React, { useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import authApi from "../../../api/authAPI";
import accountApi from "../../../api/accountAPI";
import { BackgroundLogin } from '../login/backgroundLogin/backgroundLogin';
import { RegisterForm } from "./registerForm/registerform";
import { Confirm } from "./confirm/confirm";
import { reducer, ACTION } from "./reducer/reducer";
import $ from 'jquery';
import "./style.scss";
import Swal from "sweetalert2";
const initData = {
  account: {},
  step: 1,
};

export const Register = (props) => {
  const [register, dispatch] = useReducer(reducer, initData);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      if (register.account.email) {
        await sendConfirmCode();
      }
    })();
  }, [register.account.email]);

  useEffect(() => {
    $("html,body").animate({ scrollTop: 0 }, 500);
  }, []);

  const sendConfirmCode = async () => {
    Swal.fire({
      title: "Sending...",
      didOpen: async () => {
        Swal.showLoading();
        const res = await authApi.checkAvailable({
          email: register.account.email,
          isSentCode: "true",
        });
        !res.status
          ? Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              showConfirmButton: true,
              confirmButtonColor: "#00ab15",
            })
          : setTimeout(() => {
              dispatch({
                type: ACTION.UPDATE_STEP,
                payload: 2,
              });
              Swal.close();
            }, 2000);
      },
    });
  };

  const confirmCode = (code) => {
    Swal.fire({
      title: "Sending...",
      didOpen: async () => {
        Swal.showLoading();
        const res = await authApi.confirmCode(code);
        setTimeout(async () => {
          if (!res.status) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Mã xác thực Email đã sai!",
              showConfirmButton: true,
              confirmButtonText: "Xác nhận",
              confirmButtonColor: "#00ab15",
            });
          } else {
            const res_account = await accountApi.createAccount(
              register.account
            );
            res_account.id
              ? Swal.fire({
                  icon: "success",
                  title: "Thành công",
                  text: "Bạn đã tạo tài khoản thành công!",
                  showConfirmButton: true,
                  confirmButtonText: "Đăng nhập",
                  confirmButtonColor: "#00ab15",
                }).then((result) => {
                  if (result.isConfirmed) {
                    console.log("run");
                    history.push("/login");
                  }
                })
              : Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Tạo tài khoản thất bại!",
                  showConfirmButton: true,
                  confirmButtonText: "Xác nhận",
                  confirmButtonColor: "#00ab15",
                });
          }
        }, 1000);
      },
    });
  };

  return (
    <div className="register">
      <BackgroundLogin></BackgroundLogin>
      <div className="register-body">
        <div className="wrap">
          <div className="wrap__cover">
            <RegisterForm
              dispatch={dispatch}
              action={ACTION}
              store={register}
              className={`${register.step === 1 ? "active" : "hidden"}`}
            ></RegisterForm>
            <Confirm
              confirmCode={confirmCode}
              dispatch={dispatch}
              action={ACTION}
              className={`${register.step === 2 ? "active" : "hidden"}`}
            ></Confirm>
          </div>
        </div>
      </div>
    </div>
  );
};
