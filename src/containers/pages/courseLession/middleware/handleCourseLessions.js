import { LESSION_ACTION } from "../reducer/reducer";

import courseApi from "../../../../api/courseAPI";

export const handleCourseLession = {
  loadCourse: async (data, dispatch) => {
    const course = (
      await courseApi.getSingle(data.courId, {
        getInfo: ["lectureCount", "teacherName"],
      })
    ).data;

    dispatch({
      type: LESSION_ACTION.UPDATE_COURSE,
      payload: course,
    });
  },

  loadLessions: async (data, dispatch) => {
    const lessions = (await courseApi.getLessions(data.courId)).data;

    dispatch({
      type: LESSION_ACTION.UPDATE_LESSION,
      payload: lessions,
    });
  },

  loadVideo: async (data, lessions, dispatch) => {
    if (lessions.length === 0) return;
    const { lessionId } = data;

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
      courId: data.courId,
    });
    if (!ret.data?.paid) {
      if (auth) {
        history.push(`/payment/${data.courId}`);
        return;
      }
      history.push("/login");
      return;
    }
  },
};
