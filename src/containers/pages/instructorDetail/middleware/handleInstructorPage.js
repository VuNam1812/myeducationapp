import accountApi from "../../../../api/accountAPI";
import teacherApi from "../../../../api/teacherAPI";
import { INSTRUCTOR_DETAIL_ACTION } from "../reducer/reducer";

export const handleInstructorPage = {
  loadTeacher: async (data, dispatch) => {
    const teacher = (
      await accountApi.getSingle(data.teacherId, {
        getInfo: [
          "major",
          "studentCount",
          "courseCount",
          "rate",
          "teacherDesc",
          "techniques",
        ],
      })
    ).data;

    dispatch({
      type: INSTRUCTOR_DETAIL_ACTION.INIT_DATA,
      payload: {
        teacher: { ...teacher },
      },
    });
  },

  loadCourses: async (data, dispatch) => {
    const courses = (
      await teacherApi.getCourses(data.teacherId, {
        isDelete: 0,
        getInfo: ["catName", "duration", "lectureCount"],
      })
    ).data;

    dispatch({
      type: INSTRUCTOR_DETAIL_ACTION.UPDATE_COURSES,
      payload: {
        courses: [...courses],
      },
    });
  },
};
