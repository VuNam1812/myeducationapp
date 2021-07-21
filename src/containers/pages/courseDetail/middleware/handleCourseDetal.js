import courseApi from "../../../../api/courseAPI";
import accountApi from "../../../../api/accountAPI";
import categoryApi from "../../../../api/categoryAPI";
import { COURSE_DETAIL_ACTION } from "../reducer/reducer";
import Swal from "sweetalert2";
export const handleCourseDetail = {
  loadCourse: async (params, dispatch) => {
    const { courId } = params;

    const course = await courseApi.getSingle(courId, {
      getInfo: ["teacherImage", "teacherName", "firstLecture"],
    });

    dispatch({
      type: COURSE_DETAIL_ACTION.INIT_DATA,
      payload: {
        course: {
          ...course.data,
        },
      },
    });
  },

  loadTeacher: async (params, dispatch) => {
    const { userId } = params;

    const account = await accountApi.getSingle(userId, {
      getInfo: ["studentCount", "rate", "courseCount", "teacherDesc", "major"],
    });

    dispatch({
      type: COURSE_DETAIL_ACTION.UPDATE_TEACHER,
      payload: {
        teacher: {
          ...account.data,
        },
      },
    });
  },

  loadLectures: async (params, dispatch) => {
    const { courId } = params;

    const chapters = await courseApi.getLessions(courId);

    dispatch({
      type: COURSE_DETAIL_ACTION.UPDATE_LESSION,
      payload: {
        lectures: [...chapters.data],
      },
    });
  },

  loadFeedbacks: async (params, dispatch) => {
    const { courId } = params;

    const feedbacks = await courseApi.getFeedbacks(courId);

    dispatch({
      type: COURSE_DETAIL_ACTION.UPDATE_FEEDBACK,
      payload: {
        feedbacks: { ...feedbacks.data },
      },
    });
  },

  loadCourseCat: async (course, dispatch) => {
    const courses = await categoryApi.getAllCourseByCatId(course.id_cat, {
      getInfo: ["duration"],
    });

    dispatch({
      type: COURSE_DETAIL_ACTION.UPDATE_COURSE_CAT,
      payload: {
        coursesCat: courses.data.filter((cour) => cour.id !== course.id),
      },
    });
  },

  checkPaid: async (params, dispatch) => {
    const ret = await courseApi.checkPaid({
      courId: params.courId,
    });

    dispatch({
      type: COURSE_DETAIL_ACTION.UPDATE_PAID,
      payload: ret.data?.paid ? ret.data.paid : false,
    });
  },

  checkFavoriteList: async (params, account, dispatch) => {
    const ret = await accountApi.getCourseFavorite(account.id);

    if (ret.data?.length) {
      dispatch({
        type: COURSE_DETAIL_ACTION.UPDATE_IN_FAVOTIRE,
        payload:
          ret.data.findIndex((course) => +course.id === +params.courId) !== -1,
      });
    }
  },

  handleCourseFavorite: async (course, inFavoriteList, dispatch) => {
    if (inFavoriteList) {
      const ret = await courseApi.deleteFavoriteList(course.id);
      dispatch({
        type: COURSE_DETAIL_ACTION.UPDATE_IN_FAVOTIRE,
        payload: !ret.data.deleted,
      });
    } else {
      const ret = await courseApi.addFavoriteList(course.id);
      dispatch({
        type: COURSE_DETAIL_ACTION.UPDATE_IN_FAVOTIRE,
        payload: ret.data.created,
      });
    }
    Swal.fire({
      icon: "success",
      text: `${
        !inFavoriteList ? "Đã thêm vào" : "Đã xóa khỏi"
      } danh sách!!`,
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
    });
  },
};
