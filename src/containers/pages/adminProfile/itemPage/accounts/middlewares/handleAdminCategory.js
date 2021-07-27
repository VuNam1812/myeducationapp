import { ADMIN_PROFILE_ACTION } from "../../../reducer/reducer";
import { ACCOUNT_ADMIN_ACTION } from "../reducer/reducer";
import Swal from "sweetalert2";
import accountApi from "../../../../../../api/accountAPI";
import authApi from "../../../../../../api/authAPI";
import teacherApi from "../../../../../../api/teacherAPI";
export const handleAdminAccount = {
  activeAccount: async (account, dispatch) => {
    const confirm = await Swal.fire({
      icon: "question",
      text: `Xác nhận ${account.status === 0 ? "mở" : ""} khóa tài khoản?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy bỏ",
      confirmButtonColor: "#00ab15",
      cancelButtonColor: "#dc3545",
    });

    if (confirm.isConfirmed) {
      let result = false;
      await Swal.fire({
        text: "Cập nhật khóa học",
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: async () => {
          Swal.showLoading();

          const res = await accountApi.updateActive(account.id, {
            status: +!account.status,
          });

          result = res.data.updated;

          if (result) {
            //dispatch
            dispatch({
              type:
                account.permission === 2
                  ? ADMIN_PROFILE_ACTION.UPDATE_SINGLE_USER
                  : ADMIN_PROFILE_ACTION.UPDATE_SINGLE_TEACHER,
              payload: {
                ...account,
                status: +!account.status,
              },
            });
          }

          Swal.close();
        },
      });

      if (result) {
        Swal.fire({
          icon: "success",
          text: "Cập nhật thành công.",
          showConfirmButton: false,
          didOpen: async () => {
            setTimeout(() => {
              Swal.close();
            }, 1200);
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Vui lòng thử lại.",
          showConfirmButton: false,
          didOpen: async () => {
            setTimeout(() => {
              Swal.close();
            }, 1200);
          },
        });
      }
    }
  },

  validateAll: (data, dispatch) => {
    const newData = { ...data };
    const valid = Object.keys(newData).map((item) => {
      return data[item].length === 0;
    });

    const result = valid.reduce((sum, value) => sum + +value, 0);

    dispatch({
      type: ACCOUNT_ADMIN_ACTION.UPDATE_ERROR,
      payload: valid,
    });

    return !result;
  },

  validEmailExists: async (data, dispatch) => {
    const res = await authApi.checkAvailable({
      email: data.email,
    });

    dispatch({
      type: ACCOUNT_ADMIN_ACTION.UPDATE_EMAIL_ERROR,
      payload: {
        isShow: !res.status,
        message: "*Email hiện đã tồn tại",
      },
    });

    return !res.status;
  },

  createAccountTeacher: async (data, dispatch) => {
    let result = false;
    await Swal.fire({
      text: "Tạo tài khoản",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();

        const res = await teacherApi.createAccount({
          ...data,
          permission: 1,
        });

        result = res.id ? true : false;

        if (result) {
          const teacher = await accountApi.getSingle(res.id, {
            getInfo: ["courseCount"],
          });

          dispatch({
            type: ADMIN_PROFILE_ACTION.ADD_TEACHER,
            payload: teacher.data,
          });
        }

        Swal.close();
      },
    });

    if (result) {
      Swal.fire({
        icon: "success",
        text: "Tạo tài khoản thành công.",
        showConfirmButton: false,
        didOpen: async () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng thử lại.",
        showConfirmButton: false,
        didOpen: async () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });
    }

    return result;
  },
};
