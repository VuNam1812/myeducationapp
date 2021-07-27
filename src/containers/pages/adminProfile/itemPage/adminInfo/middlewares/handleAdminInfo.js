import { ADMIN_INFO_ACTION } from "../reducer/reducer";
import { AUTH_ACTION } from "../../../../../../contexts/auth/reducer";
import accountApi from "../../../../../../api/accountAPI";
import moment from "moment";
import Swal from "sweetalert2";
export const handleAdminInfo = {
  checkCancelUpdate: async (dispatch) => {
    const confirm = await Swal.fire({
      icon: "question",
      text: "Mọi thay đổi hiện chưa được lưu?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy bỏ",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#00ab15",
    });

    if (confirm.isConfirmed) {
      //
      return true;
    } else {
      dispatch({
        type: ADMIN_INFO_ACTION.UPDATE_ACTIVE,
        payload: "mini-show",
      });
      return false;
    }
  },

  validateField: (data, dispatch) => {
    const error_name = {
      isShow: data.name.length === 0,
    };
    const error_email = {
      isShow: data.email.length === 0,
    };

    dispatch({
      type: ADMIN_INFO_ACTION.UPDATE_ERROR,
      payload: {
        name: { ...error_name },
        email: { ...error_email },
      },
    });

    return +error_email.isShow + +error_name.isShow;
  },

  updateInfoAccount: (accountId, data, authDispatch) => {
    Swal.fire({
      text: "Cập nhật thông tin",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        const res = await accountApi.updateInfo(accountId, {
          ...data,
        });

        if (res.data.updated) {
          const { data: account } = await accountApi.getSingle(accountId);

          const newAuthAccount = {
            id: account.id,
            username: account.name,
            role: +account.permission,
            srcImage: account.srcImage,
          };

          authDispatch({
            type: AUTH_ACTION.UPDATE_ACCOUNT,
            payload: newAuthAccount,
          });

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
            title: "Thất bại",
            text: "Vui lòng kiểm tra lại!!",
            showConfirmButton: false,
            didOpen: async () => {
              setTimeout(() => {
                Swal.close();
              }, 1200);
            },
          });
        }
      },
    });
  },

  changeAvatar: (account, file, authDispatch) => {
    Swal.fire({
      text: "Cập nhật hình ảnh",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();

        const linkUpload = await accountApi.getLinkUpload({
          fileName: file.name,
          fileType: file.type,
          userId: account.id,
        });

        const { urlSaveObject, urlGetObject } = linkUpload.data.uri;

        await accountApi.uploadAvatar(urlSaveObject, file, {
          "Content-type": file.type,
        });

        const updateInfo = await accountApi.updateInfo(account.id, {
          srcImage: urlGetObject,
        });

        authDispatch({
          type: AUTH_ACTION.UPDATE_AVATAR_ACCOUNT,
          payload: urlGetObject,
        });

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
      },
    });
  },
};
