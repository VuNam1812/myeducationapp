import { ADMIN_PROFILE_ACTION } from "../../../reducer/reducer";
import { AUTH_ACTION } from "../../../../../../contexts/auth/reducer";
import accountApi from "../../../../../../api/accountAPI";
import courseApi from "../../../../../../api/courseAPI";
import moment from "moment";
import Swal from "sweetalert2";
export const handleAdminCourse = {
  disableCourse: async (course, dispatch) => {
    console.log(course);
    const confirm = await Swal.fire({
      icon: "question",
      text: `Xác nhận ${course.isDelete? "mở lại" : "tạm đóng"} khóa học?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy bỏ",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#00ab15",
    });

    if (confirm.isConfirmed) {
      //disable course
      const res = await courseApi.updateActive(course.id, {
        isDelete: !course.isDelete,
      });

      if (res.data.updated) {
        dispatch({
          type: ADMIN_PROFILE_ACTION.UPDATE_SINGLE_COURSE,
          payload: {
            ...course,
            isDelete: !course.isDelete,
          },
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
          title: "Lỗi cập nhật.",
          text: "Vui lòng thử lại!!",
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
};
