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
  checkLogin: (data, dispatch, history) => {
    Swal.fire({
      title: "Login...",
      didOpen: async () => {
        Swal.showLoading();
        const res_login = await authApi.login(data);

        res_login.authenticated
          ? Swal.fire({
              icon: "success",
              text: "Đăng nhập thành công",
              showConfirmButton: true,
              confirmButtonText: "Xác nhận",
              confirmButtonColor: "#00ab15",
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch({
                  type: AUTH_ACTION.UPDATE_AUTH,
                  payload: true,
                });
                dispatch({
                  type: AUTH_ACTION.UPDATE_ACCOUNT,
                  payload: res_login.accountInfo,
                });
                history.goBack();
              }
            })
          : Swal.fire({
              icon: "error",
              title: "Opp....",
              text: res_login.err_message,
              showConfirmButton: true,
              confirmButtonText: "đăng nhập lại",
              confirmButtonColor: "#dc3545",
            });
      },
    });
  },
};
