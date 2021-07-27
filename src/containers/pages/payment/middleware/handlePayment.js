import { PAY_ACTION } from "../reducer/reducer";
import Swal from "sweetalert2";
import accountApi from "../../../../api/accountAPI";
import courseApi from "../../../../api/courseAPI";

export const handlePayment = {
  loadCourse: async (data, dispatch) => {
    const { courId } = data;

    const course = await courseApi.getSingle(courId, {
      getInfo: ["teacherName", "firstLecture"],
    });

    dispatch({
      type: PAY_ACTION.UPDATE_COURSE,
      payload: course.data,
    });
  },

  loadUserInfo: async (data, dispatch) => {
    const { id } = data;

    const user = await accountApi.getSingle(id);

    dispatch({
      type: PAY_ACTION.UPDATE_ACCOUNT,
      payload: user.data,
    });
  },

  paymentCourse: async (courId, dispatch) => {
    const res = await courseApi.paymentCourse(courId);

    if (res.data.result) {
      Swal.fire({
        icon: "success",
        text: "Thanh toán thành công!!",
        showConfirmButton: false,
        didOpen: () => {
          setTimeout(() => {
            dispatch({
              type: PAY_ACTION.UPDATE_ACTIVE,
              payload: 2,
            });
            Swal.close();
          }, 1000);
        },
      });
    }
  },

  checkAccountPayment: async (data, history) => {
    const ret = await courseApi.checkPaid({
      courId: data.courId,
    });
    if (ret.data.paid) {
      history.push(`/courses/${data.courId}`);
    }
  },
};
