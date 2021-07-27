import { LESSIONS_COURSE_ACTION } from "../reducer/lessionsCourseReducer";
import { EDIT_COURSE_ACTION } from "../reducer/editCourseReducer";
import chapterApi from "../../../../../../api/chapterAPI";
import lectureApi from "../../../../../../api/lectureAPI";
import Swal from "sweetalert2";
export const handleLessionCourse = {
  checkChapterName: (data, dispatch) => {
    dispatch({
      type: LESSIONS_COURSE_ACTION.UPDATE_ERROR_CHAPTER,
      payload: {
        chapterName: {
          isShow: data.chapterName.length === 0,
          message: "*Tên chủ đề hiện đang trống!!",
        },
      },
    });
    return !(data.chapterName.length === 0);
  },

  checkLecture: (data, dispatch) => {
    dispatch({
      type: LESSIONS_COURSE_ACTION.UPDATE_ERROR_LECTURE,
      payload: {
        lectureName: {
          isShow: data.lectureName.length === 0,
          message: "*Tên bài giảng hiện đang trống!!",
        },
      },
    });

    return data.lectureName.length !== 0;
  },

  createChapter: async (courseId, data, dispatch) => {
    const { chapterName } = data;
    let result = {};
    await Swal.fire({
      text: "Tạo khóa học",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        const res = await chapterApi.create({
          name: chapterName,
          id_course: courseId,
        });

        result = res.data;

        if (result.created) {
          const chapter = await chapterApi.getSingle(result.chapterId);
          dispatch({
            type: EDIT_COURSE_ACTION.ADD_LESSION,
            payload: chapter.data,
          });
        }

        Swal.close();
      },
    });

    if (!result.created) {
      Swal.fire({
        icon: "error",
        text: "Thêm mới lỗi!! Vui lòng thử lại.",
        showConfirmButton: false,
        didOpen: () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });

      return false;
    }

    Swal.fire({
      icon: "success",
      text: "Thêm mới thành công.",
      showConfirmButton: false,
      didOpen: async () => {
        setTimeout(() => {
          Swal.close();
        }, 1200);
      },
    });
    return true;
  },

  editChapter: async (chapter, data, dispatch) => {
    const { chapterName } = data;
    let result = {};
    await Swal.fire({
      text: "Cập nhật khóa học",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        const res = await chapterApi.updateInfo(chapter.id, {
          name: chapterName,
        });

        result = res.data;
        if (result.updated) {
          dispatch({
            type: EDIT_COURSE_ACTION.UPDATE_SINGLE_LESSION,
            payload: { ...chapter, name: chapterName },
          });
        }

        Swal.close();
      },
    });

    if (!result.updated) {
      Swal.fire({
        icon: "error",
        text: "Cập nhật lỗi!! Vui lòng thử lại.",
        showConfirmButton: false,
        didOpen: () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });

      return false;
    }

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
    return true;
  },

  deleteChapter: async (chapter, dispatch) => {
    const confirm = await Swal.fire({
      icon: "question",
      titleText: "Xác nhận xóa ?",
      text: `${chapter.lectures.length ? "Chủ đề hiện đang có bài giảng" : ""}`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy bỏ",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#00ab15",
    });
    let result = false;
    if (confirm.isConfirmed) {
      await Swal.fire({
        text: "Xóa chủ đề",
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: async () => {
          Swal.showLoading();

          const res = await chapterApi.deleteChapter(chapter.id);
          result = res.data.deleted;
          if (res.data.deleted) {
            dispatch({
              type: EDIT_COURSE_ACTION.DELETE_SINGLE_LESSION,
              payload: chapter.id,
            });
          }

          Swal.close();
        },
      });
      if (!result) {
        Swal.fire({
          icon: "error",
          text: "Xóa chủ đề lỗi!! Vui lòng thử lại.",
          showConfirmButton: false,
          didOpen: () => {
            setTimeout(() => {
              Swal.close();
            }, 1200);
          },
        });

        return;
      }

      Swal.fire({
        icon: "success",
        text: "Xóa chủ đề thành công.",
        showConfirmButton: false,
        didOpen: async () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });
    }
  },

  createLecture: async (account, data, dispatch) => {
    const newLecture = { ...data };
    delete newLecture.chapterName;
    delete newLecture.lectureName;

    newLecture.name = data.lectureName;

    let result = false;

    await Swal.fire({
      text: "Tạo bài giảng",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        if (newLecture.src && typeof newLecture.src === "object") {
          const linkUpload = await lectureApi.getLinkUpload({
            fileName: newLecture.src.name,
            fileType: newLecture.src.type,
            userId: account.id,
          });

          const { urlGetObject, urlSaveObject } = linkUpload.data.uri;

          await lectureApi.uploadVideo(urlSaveObject, newLecture.src, {
            "Content-type": newLecture.src.type,
          });

          newLecture.src = urlGetObject;
        }

        const res = await lectureApi.create(newLecture);
        result = res.data.created;

        if (result) {
          const chapter = await chapterApi.getSingle(newLecture.id_chapter);

          dispatch({
            type: EDIT_COURSE_ACTION.UPDATE_SINGLE_LESSION,
            payload: chapter.data,
          });
        }

        Swal.close();
      },
    });

    if (result) {
      Swal.fire({
        icon: "success",
        text: "Tạo bài giảng thành công.",
        showConfirmButton: false,
        didOpen: async () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });

      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng kiểm tra lại thông tin!!",
        showConfirmButton: false,
        didOpen: async () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });
      return false;
    }
  },

  editLecture: async (account, lecture, data, dispatch) => {
    let editLecture = { ...data };
    delete editLecture.chapterName;
    delete editLecture.lectureName;

    editLecture.name = data.lectureName;

    editLecture = { ...lecture, ...editLecture };

    let result = false;

    await Swal.fire({
      text: "Cập nhật bài giảng",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();

        if (editLecture.src && typeof editLecture.src === "object") {
          const linkUpload = await lectureApi.getLinkUpload({
            fileName: editLecture.src.name,
            fileType: editLecture.src.type,
            userId: account.id,
          });

          const { urlGetObject, urlSaveObject } = linkUpload.data.uri;

          await lectureApi.uploadVideo(urlSaveObject, editLecture.src, {
            "Content-Type": editLecture.src.type,
          });

          editLecture.src = urlGetObject;
        }

        const res = await lectureApi.updateInfo(lecture.id, editLecture);
        result = res.data.updated;

        if (result) {
          const chapter = await chapterApi.getSingle(editLecture.id_chapter);

          dispatch({
            type: EDIT_COURSE_ACTION.UPDATE_SINGLE_LESSION,
            payload: chapter.data,
          });
        }

        Swal.close();
      },
    });

    if (result) {
      Swal.fire({
        icon: "success",
        text: "Cập nhật bài giảng thành công.",
        showConfirmButton: false,
        didOpen: async () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });

      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng kiểm tra lại thông tin!!",
        showConfirmButton: false,
        didOpen: async () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });
      return false;
    }
  },

  deleteLecture: async (lecture, dispatch) => {
    const confirm = await Swal.fire({
      icon: "question",
      titleText: "Xác nhận xóa ?",
      text: `${lecture.src.length ? "Bài giảng hiện đang có video" : ""}`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy bỏ",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#00ab15",
    });
    let result = false;
    if (confirm.isConfirmed) {
      await Swal.fire({
        text: "Xóa bài giảng",
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: async () => {
          Swal.showLoading();

          const res = await lectureApi.delete(lecture.id);
          result = res.data.deleted;
          if (res.data.deleted) {
            const chapter = await chapterApi.getSingle(lecture.id_chapter);

            dispatch({
              type: EDIT_COURSE_ACTION.UPDATE_SINGLE_LESSION,
              payload: chapter.data,
            });
          }

          Swal.close();
        },
      });
      if (!result) {
        Swal.fire({
          icon: "error",
          text: "Xóa bài giảng lỗi!! Vui lòng thử lại.",
          showConfirmButton: false,
          didOpen: () => {
            setTimeout(() => {
              Swal.close();
            }, 1200);
          },
        });

        return;
      }

      Swal.fire({
        icon: "success",
        text: "Xóa bài giảng thành công.",
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
