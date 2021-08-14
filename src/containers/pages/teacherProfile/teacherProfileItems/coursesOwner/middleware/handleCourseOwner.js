import { COURSES_OWNER_ACTION } from "../reducer/reducer";
import { EDIT_COURSE_ACTION } from "../reducer/editCourseReducer";
import { TEACHER_PROFILE_ACTION } from "../../../reducer/reducer";
import categoryApi from "../../../../../../api/categoryAPI";
import courseApi from "../../../../../../api/courseAPI.jsx";
import Swal from "sweetalert2";

export const handleCourseOwner = {
  handleFilterCharacterCourse: (index, courses, dispatch) => {
    const newCourses =
      index === 0
        ? courses
        : courses.filter((course) =>
            course.courName
              .toLocaleUpperCase()
              .startsWith(String.fromCharCode(64 + index))
          );

    dispatch({
      type: COURSES_OWNER_ACTION.UPDATE_COURSE,
      payload: newCourses,
    });

    dispatch({
      type: COURSES_OWNER_ACTION.UPDATE_SEARCH,
      payload: "",
    });

    dispatch({
      type: COURSES_OWNER_ACTION.UPDATE_FILTER_CHARACTER,
      payload: index,
    });
  },

  handleSearchCourse: (text, courses, dispatch) => {
    const newCourse = courses.filter((course) => {
      if (
        course.courName.toLocaleLowerCase().search(text.toLocaleLowerCase()) !==
        -1
      ) {
        return course;
      }
    });

    dispatch({
      type: COURSES_OWNER_ACTION.UPDATE_SEARCH,
      payload: text,
    });
    dispatch({
      type: COURSES_OWNER_ACTION.UPDATE_FILTER_CHARACTER,
      payload: 0,
    });

    dispatch({
      type: COURSES_OWNER_ACTION.UPDATE_COURSE,
      payload: newCourse,
    });
  },

  updateCourseInfo: async (id, data, ownerDispatch, dispatch) => {
    const res = await courseApi.uploadInfo(id, data);
    if (!res.data.updated) {
      Swal.fire({
        icon: "error",
        text: "Cập nhật thất bại!! Vui lòng kiểm tra lại.",
        showConfirmButton: false,
        didOpen: () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });
      return false;
    }

    const courseTarget = await courseApi.getSingle(id, {
      getInfo: ["duration", "lectureCount"],
    });

    ownerDispatch({
      type: COURSES_OWNER_ACTION.UPDATE_COURSE_SELECT,
      payload: courseTarget.data,
    });

    dispatch({
      type: TEACHER_PROFILE_ACTION.UPDATE_SINGLE_COURSE,
      payload: courseTarget.data,
    });

    Swal.fire({
      icon: "success",
      text: "Cập nhật thành công!!",
      showConfirmButton: false,
      didOpen: () => {
        setTimeout(() => {
          Swal.close();
        }, 1000);
      },
    });
    return true;
  },

  checkCancel: async (id, data, ownerDispatch, dispatch) => {
    const confirm = await Swal.fire({
      icon: "question",
      text: "Mọi thay đổi chưa được cập nhật!!",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Cập nhập",
      cancelButtonText: "Hủy bỏ",
      confirmButtonColor: "#00ab15",
      cancelButtonColor: "#dc3545",
    });
    if (!confirm.isConfirmed) {
      const courseTarget = await courseApi.getSingle(id, {
        getInfo: ["duration", "lectureCount"],
      });

      dispatch({
        type: TEACHER_PROFILE_ACTION.UPDATE_SINGLE_COURSE,
        payload: courseTarget.data,
      });

      ownerDispatch({
        type: COURSES_OWNER_ACTION.UPDATE_ACTIVE,
        payload: 1,
      });
    } else {
      Swal.fire({
        text: "Đang cập nhật",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: async () => {
          Swal.showLoading();

          //patch course
          const result = await handleCourseOwner.updateCourseInfo(
            id,
            data,
            ownerDispatch,
            dispatch
          );
          if (result) {
            ownerDispatch({
              type: COURSES_OWNER_ACTION.UPDATE_ACTIVE,
              payload: 1,
            });
          }
        },
      });
    }
  },

  loadCategories: async (dispatch) => {
    const cat_res = await categoryApi.getAll();

    let cats = [];
    cat_res.data.all.forEach((cat) => {
      cat.isSubCategory = cat.id_parentCat === 0 ? true : false;
      if (cat.id_parentCat === 0) {
        cat.subCategory = cat_res.data.all.filter(
          (value) => value.id_parentCat === cat.id
        );
        cat.isSubCategory = cat.subCategory.length === 0 ? false : true;
        cats.push(cat);
      }
    });

    dispatch({
      type: COURSES_OWNER_ACTION.UPDATE_CATEGORIES,
      payload: cats,
    });
  },

  checkSubCategories: (categories, id) => {
    const cat = categories.filter((cat) => {
      if (cat.isSubCategory && cat.id !== id) {
        const catTarget = cat.subCategory.filter(
          (catChild) => catChild.id === id
        );
        return catTarget.length;
      }

      if (cat.id === id) {
        return true;
      }
    });

    return {
      isSubCategory: cat[0].isSubCategory,
      parentCat: cat[0].id,
    };
  },

  updateCategoryEdit: (dispatch, course, resultCheck) => {
    dispatch({
      type: EDIT_COURSE_ACTION.UPDATE_CAT_SELECT,
      payload: +course.id_cat,
    });

    dispatch({
      type: EDIT_COURSE_ACTION.UPDATE_IS_SUBCAT,
      payload: resultCheck.isSubCategory,
    });

    dispatch({
      type: EDIT_COURSE_ACTION.UPDATE_PARENT_CAT,
      payload: resultCheck.parentCat,
    });

    if (resultCheck.isSubCategory && course.id_cat !== resultCheck.parentCat) {
      dispatch({
        type: EDIT_COURSE_ACTION.UPDATE_CHILDREN_CAT,
        payload: course.id_cat,
      });
    } else {
      dispatch({
        type: EDIT_COURSE_ACTION.UPDATE_CHILDREN_CAT,
        payload: -1,
      });
    }
  },

  changeImageCourse: async (file, course, ownerDispatch, dispatch) => {
    let result = false;

    await Swal.fire({
      text: "Cập nhật hình ảnh khóa học",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        const linkUpload = await courseApi.getLinkUpload({
          fileName: file.name,
          fileType: file.type,
          userId: course.id_owner,
        });

        const { urlGetObject, urlSaveObject } = linkUpload.data.uri;

        try {
          const res = await Promise.all([
            courseApi.uploadImage(urlSaveObject, file, {
              "Content-type": file.type,
            }),
            courseApi.uploadInfo(course.id, {
              srcImage: urlGetObject,
            }),
          ]);
          result = res[1].data.updated;
        } catch (error) {}

        Swal.close();
      },
    });

    if (!result) {
      await Swal.fire({
        icon: "error",
        text: "Cập nhật thất bại!! Vui lòng thử lại.",
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });

      return;
    }

    const courseTarget = await courseApi.getSingle(course.id, {
      getInfo: ["duration", "lectureCount"],
    });

    //update course select
    ownerDispatch({
      type: COURSES_OWNER_ACTION.UPDATE_COURSE_SELECT,
      payload: courseTarget.data,
    });

    dispatch({
      type: TEACHER_PROFILE_ACTION.UPDATE_SINGLE_COURSE,
      payload: courseTarget.data,
    });

    await Swal.fire({
      icon: "success",
      text: "Cập nhật hình ảnh khóa học thành công!!",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        setTimeout(() => {
          Swal.close();
        }, 1300);
      },
    });
  },

  loadLessions: async (id, dispatch) => {
    const res = await courseApi.getLessions(id);
    dispatch({
      type: EDIT_COURSE_ACTION.UPDATE_LESSION,
      payload: res.data,
    });
  },
};
