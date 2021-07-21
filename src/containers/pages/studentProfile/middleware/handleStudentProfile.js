import accountApi from "../../../../api/accountAPI";
import courseApi from "../../../../api/courseAPI";
import Swal from "sweetalert2";
import { STUDENT_PROFILE_ACTION } from "../reducer/reducer";
import { AUTH_ACTION } from "../../../../contexts/auth/reducer";
export const handleStudentProfile = {
  loadProfile: async (data, dispatch) => {
    const { accountId } = data;

    const account = (await accountApi.getSingle(accountId)).data;

    account.role = "Học viên";

    dispatch({
      type: STUDENT_PROFILE_ACTION.INIT_DATA,
      payload: {
        ...account,
      },
    });
  },

  loadCourseJoin: async (data, dispatch) => {
    const { accountId } = data;

    const courses = await accountApi.getCourseJoin(accountId, {
      getInfo: ["lectureCount", "teacherName", "firstLecture"],
    });

    dispatch({
      type: STUDENT_PROFILE_ACTION.UPDATE_COURSE_JOIN,
      payload: [...courses.data],
    });
  },

  loadCourseFavorite: async (data, dispatch) => {
    const { accountId } = data;

    const courses = await accountApi.getCourseFavorite(accountId, {
      getInfo: ["lectureCount", "teacherName", "firstLecture"],
    });

    if (courses.data?.length) {
      for (const course of courses.data) {
        course.paid = (
          await courseApi.checkPaid({
            courId: course.id,
          })
        ).data?.paid;
      }
    }

    dispatch({
      type: STUDENT_PROFILE_ACTION.UPDATE_COURSE_FAVORITE,
      payload: [...courses.data],
    });
  },

  changeAvatar: async (file, info, dispatch, dispatchAuth) => {
    let result = false;
    await Swal.fire({
      text: "Cập nhật hình đại diện",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();

        const linkUpload = await accountApi.getLinkUpload({
          fileName: file.name,
          fileType: file.type,
          userId: info.id,
        });

        const { urlSaveObject, urlGetObject } = linkUpload.data.uri;

        await accountApi.uploadAvatar(urlSaveObject, file, {
          "Content-Type": file.type,
        });

        const updateAccount = await accountApi.updateInfo(info.id, {
          srcImage: urlGetObject,
        });

        result = updateAccount.data.updated;

        if (result) {
          dispatch({
            type: STUDENT_PROFILE_ACTION.UPDATE_AVATAR_ACCOUNT,
            payload: urlGetObject,
          });

          dispatchAuth({
            type: AUTH_ACTION.UPDATE_AVATAR_ACCOUNT,
            payload: urlGetObject,
          });
        }

        Swal.close();
      },
    });

    if (result) {
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
        title: "Lỗi",
        text: "Vui lòng thử lại.",
        showConfirmButton: false,
        didOpen: async () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });
    }
  },
};
