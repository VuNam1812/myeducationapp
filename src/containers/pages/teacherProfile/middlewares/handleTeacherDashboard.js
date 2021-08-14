import accountApi from "../../../../api/accountAPI";
import teacherApi from "../../../../api/teacherAPI";

import { TEACHER_PROFILE_ACTION } from "../reducer/reducer";

export const handleTeacheDashboard = {
  loadAccount: async (data, dispatch) => {
    const { id } = data;
    const teacher = await accountApi.getSingle(id, {
      getInfo: ["major", "teacherDesc", "techniques"],
    });

    dispatch({
      type: TEACHER_PROFILE_ACTION.INIT_DATA,
      payload: teacher.data,
    });
  },
  loadCourseOwner: async (data, dispatch) => {
    const { id } = data;

    const { data: courses } = await teacherApi.getCourses(id, {
      isDelete: -1,
      getInfo: ["lectureCount", "duration"],
    });
    dispatch({
      type: TEACHER_PROFILE_ACTION.UPDATE_COURSES,
      payload: courses.reverse(),
    });
  },
};
