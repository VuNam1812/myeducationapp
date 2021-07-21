import Swal from "sweetalert2";
import accountApi from "../../../../api/accountAPI";

import { STUDENT_PROFILE_ACTION } from "../reducer/reducer";
import { AUTH_ACTION } from "../../../../contexts/auth/reducer";
export const handleEditProfile = {
  confirmCancel: async () => {
    const modalConfirm = await Swal.fire({
      icon: "warning",
      text: "Mọi thay đổi hiện chưa được lưu lại?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Cập nhập",
      confirmButtonColor: "#075e89",
      cancelButtonText: "Hủy bỏ",
      cancelButtonColor: "#dc3545",
    });
    if (modalConfirm.isConfirmed) {
      //update info
      return true;
    }
    return false;
  },

  updateAccount: async (info, values, dispatch, authDispatch) => {
    await Swal.fire({
      title: "Saving...",
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        //update info;
        const res = await accountApi.updateInfo(info.id, {
          ...values,
          gender: +values.gender,
        });
        if (res.data.updated) {
          const accountUpdate = (await accountApi.getSingle(info.id)).data;

          accountUpdate.role = "Học viên";

          dispatch({
            type: STUDENT_PROFILE_ACTION.INIT_DATA,
            payload: accountUpdate,
          });

          authDispatch({
            type: AUTH_ACTION.UPDATE_ACCOUNT,
            payload: {
              ...info,
              role: +info.permission,
              username: `${values.firstName} ${values.lastName}`,
            },
          });
        }
        Swal.close();
      },
    });
    Swal.fire({
      icon: "success",
      text: "Cập nhật thành công!!",
      showConfirmButton: false,
      didOpen: () => {
        setTimeout(() => {
          Swal.close();
        }, 1000);
      },
    });
  },

  checkAllField: (values, dispatch) => {
    const error_firstName = {
      isShow: values.firstName.length === 0,
    };
    const error_lastName = {
      isShow: values.lastName.length === 0,
    };
    const error_email = {
      isShow: values.email.length === 0,
    };

    dispatch({
      type: STUDENT_PROFILE_ACTION.UPDATE_ERROR,
      payload: {
        firstName: { ...error_firstName },
        lastName: { ...error_lastName },
        email: { ...error_email },
      },
    });

    return (
      +error_email.isShow + +error_firstName.isShow + +error_lastName.isShow
    );
  },

  checkEmailExist: async (values, dispatch) => {
    const { email } = values;

    const result = await accountApi.checkEmailAvailable({
      email: email
    });
    if (result.data.available) {
      dispatch({
        type: STUDENT_PROFILE_ACTION.UPDATE_EMAIL_ERROR,
        payload: {
          isShow: true,
          message: "* Email đã được đăng ký, Vui lòng chọn Email khác!!",
        },
      });
    }

    return result.available;
  },
};
