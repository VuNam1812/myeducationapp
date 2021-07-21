import Swal from "sweetalert2";
import accountApi from "../../../../api/accountAPI";
import { STUDENT_PROFILE_ACTION } from "../reducer/reducer";

export const handleChangePassword = {
  checkOldPassword: async (data, dispatch) => {
    const { oldPassword } = data;

    const res = await accountApi.checkPassword({
      password: oldPassword,
    });
    console.log(res.data.result);
    dispatch({
      type: STUDENT_PROFILE_ACTION.UPDATE_ERROR_OLD_PASSWORD,
      payload: {
        isShow: !res.data.result,
        message: "* Mật khẩu đã nhập chưa chính xác!!",
      },
    });

    return res.data.result;
  },

  checkAllField: async (data, dispatch) => {
    const errors = Object.keys(data).map((item) => data[item].length === 0);

    const payload = {};
    const result = +errors.reduce((sum, value) => sum + +value, 0) === 0;

    Object.keys(data).map((item, index) => {
      payload[item] = {
        isShow: errors[index],
      };
    });

    dispatch({
      type: STUDENT_PROFILE_ACTION.UPDATE_ERROR_CHANGE_PASSWORD_ALL,
      payload: {
        ...payload,
      },
    });

    return result;
  },

  checkConfirmPassword: async (data, dispatch) => {
    const { newPassword, confirmNewPassword } = data;

    dispatch({
      type: STUDENT_PROFILE_ACTION.UPDATE_ERROR_CONFIRM_NEW_PASSWORD,
      payload: {
        isShow: !(newPassword === confirmNewPassword),
        message: "* Nhập lại mật khẩu chưa chính xác!!",
      },
    });
    return newPassword === confirmNewPassword;
  },

  updatePassword: async (info, data, form, dispatch) => {
    Swal.fire({
      title: "Cập nhật mật khẩu",
      didOpen: async () => {
        Swal.showLoading();
        const res = await accountApi.updateInfo(info.id, {
          password: data.newPassword,
        });

        if (res.data.updated) {
          Swal.fire({
            icon: "success",
            text: "Thay đổi mật khẩu thành công!!",
            showConfirmButton: false,
            didOpen: () => {
              form.target.reset();
              setTimeout(() => {
                dispatch({
                  type: STUDENT_PROFILE_ACTION.MODAL_CLOSE,
                });
                Swal.close();
              }, 1000);
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "Thay đổi mật khẩu thất bại!!",
            text: " Vui lòng thử lại",
            showConfirmButton: false,
            didOpen: () => {
              setTimeout(() => {
                Swal.close();
              }, 2000);
            },
          });
        }
      },
    });
  },
};
