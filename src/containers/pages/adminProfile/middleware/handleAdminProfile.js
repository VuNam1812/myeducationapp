import accountApi from "../../../../api/accountAPI";
import categoryApi from "../../../../api/categoryAPI";
import courseApi from "../../../../api/courseAPI";
import teacherApi from "../../../../api/teacherAPI";
import { ADMIN_PROFILE_ACTION } from "../reducer/reducer";

export const handleAdminProfile = {
  loadAccount: async (data, dispatch) => {
    const res = await accountApi.getSingle(data.id, {
      getInfo: [],
    });

    dispatch({
      type: ADMIN_PROFILE_ACTION.UPDATE_ACCOUNT,
      payload: res.data,
    });
  },

  loadCourses: async (dispatch) => {
    const res = await courseApi.getAll();

    dispatch({
      type: ADMIN_PROFILE_ACTION.UPDATE_COURSES,
      payload: res.data.all,
    });
  },

  loadTeachers: async (dispatch) => {
    const res = await teacherApi.getAll({
      getInfo: ["courseCount"],
    });

    dispatch({
      type: ADMIN_PROFILE_ACTION.UPDATE_TEACHERS,
      payload: res.data.all,
    });
  },

  loadUsers: async (dispatch) => {
    const res = await accountApi.getAll({
      getInfo: ["paidCourseCount"],
    });

    dispatch({
      type: ADMIN_PROFILE_ACTION.UPDATE_USERS,
      payload: res.data
    })
  },
};
