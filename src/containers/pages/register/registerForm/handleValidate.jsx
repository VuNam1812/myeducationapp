import { ACTION } from "./reducer";
import authApi from "../../../../api/authAPI";
import Swal from "sweetalert2";
export const handleValidate = {
  validateAll: (data, dispatch) => {
    const firstName = {
      show: data.firstName.length === 0 ? true : false,
    };

    const lastName = {
      show: data.lastName.length === 0 ? true : false,
    };
    const email = {
      show: data.email.length === 0 ? true : false,
    };
    const dob = { show: data.dob.length === 0 ? true : false };
    const password = {
      show: data.password.length === 0 ? true : false,
    };
    const confirmPassword = {
      show: data.confirmPassword.length === 0 ? true : false,
    };
    const flag =
      +firstName.show +
      +lastName.show +
      +email.show +
      +dob.show +
      +password.show +
      +confirmPassword.show;

    +flag > 0
      ? dispatch({
          type: ACTION.UPDATE_ALL,
          payload: [
            firstName.show,
            lastName.show,
            email.show,
            dob.show,
            password.show,
            confirmPassword.show,
          ],
        })
      : dispatch({
          type: ACTION.UPDATE_ALL,
          payload: new Array(6).fill(false),
        });

    return !(+flag > 0);
  },
  validateConfirmPassword: (data, dispatch) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      dispatch({
        type: ACTION.UPDATE_ERROR_CONFIRMPASSWORD,
        payload: {
          show: true,
          message: "*Nhập lại mật khẩu chưa đúng!!",
        },
      });
      return false;
    }
    dispatch({
      type: ACTION.UPDATE_ERROR_CONFIRMPASSWORD,
      payload: {
        show: false,
        message: "",
      },
    });
    return true;
  },
  validateEmail: async (email, dispatch) => {
    console.log(email);
    const res = await authApi.checkAvailable({ email });
    if (!res.status) {
      dispatch({
        type: ACTION.UPDATE_ERROR_EMAIL,
        payload: {
          show: true,
          message: "*Email hiện đã được đăng ký!",
        },
      });
    }
    return res.status;
  },
  validateGender: (gender) => {
    if (typeof gender !== "undefined") {
      return true;
    }
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Bạn chưa chọn giới tính!!",
      confirmButtonColor: "#00ab15",
    });
    return false;
  },
};
