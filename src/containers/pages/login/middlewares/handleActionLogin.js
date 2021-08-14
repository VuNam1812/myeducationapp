import { ACTION } from "../reducer/loginReducer";
import authApi from "../../../../api/authAPI";
import { AUTH_ACTION } from "../../../../contexts/auth/reducer";
import Swal from "sweetalert2";
export const handleAction = {
  updateStoreLogin: (data, dispatch) => {
    dispatch({
      type: ACTION.UPDATE_DATA_LOGIN,
      payload: data,
    });
  },
  checkLogin: (data, type, dispatch, history) => {
    Swal.fire({
      title: "Đăng nhập",
      didOpen: async () => {
        Swal.showLoading();
        let res_login = {};
        switch (type) {
          case "normal":
            res_login = await authApi.login(data);
            break;
          case "facebook":
            res_login = await authApi.facebookLogin(data);
            break;
          case "google":
            res_login = await authApi.googleLogin(data);
            break;
        }

        res_login.authenticated
          ? Swal.fire({
              icon: "success",
              text: "Đăng nhập thành công",
              showConfirmButton: false,
              timer: 1200,
              didOpen: () => {
                dispatch({
                  type: AUTH_ACTION.UPDATE_ACCOUNT,
                  payload: res_login.accountInfo,
                });
              },
              willClose: () => {
                setTimeout(() => {
                  dispatch({
                    type: AUTH_ACTION.UPDATE_AUTH,
                    payload: true,
                  });
                }, 1000);
                history.goBack();
              },
            })
          : Swal.fire({
              icon: "error",
              title: "Opp....",
              text: res_login.err_message,
              showConfirmButton: true,
              confirmButtonText: "Đăng nhập lại",
              confirmButtonColor: "#dc3545",
            });
      },
    });
  },
};
