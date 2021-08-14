import { LESSION_ACTION } from "../reducer/reducer";

import courseApi from "../../../../api/courseAPI";
import lectureApi from "../../../../api/lectureAPI";
import Swal from "sweetalert2";

export const handleCourseLession = {
  loadCourse: async (data, dispatch, history) => {
    const course = (
      await courseApi.getSingle(data.slugCourse, {
        bySlug: true,
        getInfo: ["lectureCount", "teacherName"],
      })
    ).data;
    if (course.isDelete === 1) {
      await Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Khóa học đã bị khóa bởi quản trị viên.",
        showConfirmButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Quay lại",
        allowOutsideClick: false,
        allowEscapeKey: false,
        willClose: () => {
          history.goBack();
        },
      });
      return;
    }
    dispatch({
      type: LESSION_ACTION.UPDATE_COURSE,
      payload: course,
    });
  },

  loadLessions: async (params, data, dispatch, history) => {
    const lessions = (await courseApi.getUserLessions(data.id)).data;
    if (lessions.length === 0) {
      Swal.fire({
        icon: "info",
        text: "Khóa học hiện tại chưa có bài giảng!!",
        confirmButtonText: "Quay lại",
        confirmButtonColor: "#00ab15",
        allowOutsideClick: false,
        allowEscapeKey: false,
        willClose: () => {
          history.goBack();
        },
      });
    }
    const lectureTarget = lessions.map((lession) => {
      const lecture = lession.lectures.filter(
        (lecture) => lecture.slug === params.slugLession
      );

      if (lecture.length !== 0) {
        return lecture[0].id;
      }
      return 0;
    });

    dispatch({
      type: LESSION_ACTION.UPDATE_ACTIVE,
      payload: lectureTarget.find((val) => val > 0),
    });

    dispatch({
      type: LESSION_ACTION.UPDATE_LESSION,
      payload: lessions,
    });
  },

  loadLessionActive: async (data, dispatch) => {
    const lecture = await lectureApi.getSingle(data.slugLession, {
      bySlug: true,
    });

    dispatch({
      type: LESSION_ACTION.UPDATE_ACTIVE,
      payload: lecture.data.id,
    });
  },

  loadVideo: (lessionId, lessions, dispatch) => {
    if (lessions.length === 0) return;

    const lession = lessions.filter((val) =>
      val.lectures.some((lecture) => +lecture.id === +lessionId)
    )[0];

    if (lession) {
      const video = lession.lectures.filter((val) => +val.id === +lessionId)[0];

      dispatch({
        type: LESSION_ACTION.UPDATE_VIDEO,
        payload: video,
      });
    }
  },

  checkAccountPayment: async (data, auth, history) => {
    const ret = await courseApi.checkPaid({
      slug: data.slugCourse,
      bySlug: true,
    });
    if (!ret.data?.paid) {
      if (auth) {
        history.push(`/payment/${data.slugCourse}`);
        return false;
      }
      history.push("/login");
      return false;
    }

    return true;
  },
};
