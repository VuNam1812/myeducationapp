export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case LESSIONS_COURSE_ACTION.MODAL_CHAPTER_CREATE_OPEN:
      return {
        ...state,
        modalChapterState: enumState.VISIBLE,
        isCreateChapter: true,
      };

    case LESSIONS_COURSE_ACTION.MODAL_CHAPTER_EDIT_OPEN:
      return {
        ...state,
        modalChapterState: enumState.VISIBLE,
        isCreateChapter: false,
      };

    case LESSIONS_COURSE_ACTION.MODAL_CHAPTER_CLOSE:
      return {
        ...state,
        modalChapterState: enumState.CLOSE,
      };

    case LESSIONS_COURSE_ACTION.MODAL_LECTURE_CREATE_OPEN:
      return {
        ...state,
        modalLectureState: enumState.VISIBLE,
        isCreateLecture: true,
      };

    case LESSIONS_COURSE_ACTION.MODAL_LECTURE_EDIT_OPEN:
      return {
        ...state,
        modalLectureState: enumState.VISIBLE,
        isCreateLecture: false,
      };

    case LESSIONS_COURSE_ACTION.MODAL_LECTURE_CLOSE:
      return {
        ...state,
        modalLectureState: enumState.CLOSE,
      };

    case LESSIONS_COURSE_ACTION.UPDATE_ERROR_CHAPTER:
      return {
        ...state,
        errors: {
          ...state.errors,
          chapterName: {
            ...payload.chapterName,
          },
        },
      };

    case LESSIONS_COURSE_ACTION.UPDATE_CHAPTER_SELECT:
      return {
        ...state,
        chapterSelect: { ...payload },
      };

    case LESSIONS_COURSE_ACTION.UPDATE_LECTURE_SELECT:
      return {
        ...state,
        lectureSelect: { ...payload },
      };

    case LESSIONS_COURSE_ACTION.UPDATE_URL_VIDEO:
      return {
        ...state,
        urlVideo: payload,
      };

    case LESSIONS_COURSE_ACTION.UPDATE_ERROR_LECTURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          lectureName: {
            ...payload.lectureName,
          },
        },
      };

    case LESSIONS_COURSE_ACTION.RESET_ERROR:
      return {
        ...state,
        errors: {
          chapterName: {
            isShow: false,
            message: "*Tên chủ đề hiện đang trống!!",
          },
          lectureName: {
            isShow: false,
            message: "*Tên bài giảng hiện đang trống!!",
          },
        },
      };
    default:
      return state;
  }
};

export const LESSIONS_COURSE_ACTION = {
  MODAL_CHAPTER_CREATE_OPEN: 1,
  MODAL_CHAPTER_EDIT_OPEN: 2,
  MODAL_CHAPTER_CLOSE: 3,
  MODAL_LECTURE_CREATE_OPEN: 4,
  MODAL_LECTURE_EDIT_OPEN: 5,
  MODAL_LECTURE_CLOSE: 6,
  UPDATE_ERROR_CHAPTER: 7,
  UPDATE_CHAPTER_SELECT: 8,
  UPDATE_LECTURE_SELECT: 9,
  UPDATE_URL_VIDEO: 10,
  UPDATE_ERROR_LECTURE: 11,
  RESET_ERROR: 12,
};

export const enumState = {
  HIDDEN: "hidden",
  CLOSE: "close",
  VISIBLE: "visible",
};
