import courseApi from "../../../../api/courseAPI";
import accountApi from "../../../../api/accountAPI";
import categoryApi from "../../../../api/categoryAPI";
import { COURSE_DETAIL_ACTION } from "../reducer/reducer";
import Swal from "sweetalert2";
export const handleCourseDetail = {
  loadCourse: async (params, dispatch, history) => {
    const { courId } = params;

    courseApi
      .getSingle(courId, {
        getInfo: ["teacherImage", "teacherName", "firstLecture"],
      })
      .then(async (course) => {
        if (course.data.isDelete === 1) {
          await Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Khóa học đã bị khóa bởi quản trị viên.",
            showConfirmButton: true,
            confirmButtonColor: "#dc3545",
            confirmButtonText: "Quay lại",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              history.goBack();
            }
          });
        }
        dispatch({
          type: COURSE_DETAIL_ACTION.INIT_DATA,
          payload: {
            course: {
              ...course.data,
            },
          },
        });
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

    const feedbacks = await courseApi.getFeedbacks(courId, {
      limit: 3,
      page: 1,
    });

    dispatch({
      type: COURSE_DETAIL_ACTION.UPDATE_FEEDBACK,
      payload: {
        feedbacks: { ...feedbacks.data },
      },
    });
  },

  loadCourseCat: async (course, dispatch) => {
    const courses = await categoryApi.getAllCourseByCatId(course.id_cat, {
      page: 1,
      limit: 6,
      getInfo: ["duration", "firstLecture"],
    });

    dispatch({
      type: COURSE_DETAIL_ACTION.UPDATE_COURSE_CAT,
      payload: {
        coursesCat: courses.data.courses
          .filter((cour) => cour.id !== course.id)
          .slice(0, 5),
      },
    });
  },

  checkPaid: async (params, dispatch) => {
    return courseApi
      .checkPaid({
        courId: params.courId,
      })
      .then((res) => {
        dispatch({
          type: COURSE_DETAIL_ACTION.UPDATE_PAID,
          payload: res.data?.paid ? res.data.paid : false,
        });
      });
  },

  checkFavoriteList: async (params, account, dispatch) => {
    return accountApi.getCourseFavorite(account.id).then((ret) => {
      if (ret.data?.length) {
        dispatch({
          type: COURSE_DETAIL_ACTION.UPDATE_IN_FAVOTIRE,
          payload:
            ret.data.findIndex((course) => +course.id === +params.courId) !==
            -1,
        });
      }
    });
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
      text: `${!inFavoriteList ? "Đã thêm vào" : "Đã xóa khỏi"} danh sách!!`,
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
    });
  },

  updateViewCount: (course) => {
    return courseApi.updateView(course.id, {
      viewCount: course.viewCount + 1,
    });
  },
};
