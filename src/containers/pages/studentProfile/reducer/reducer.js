export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case STUDENT_PROFILE_ACTION.INIT_DATA:
      return {
        ...state,
        account: {
          ...payload,
        },
      };
    case STUDENT_PROFILE_ACTION.MODAL_CLOSE:
      return {
        ...state,
        modalState: enumState.CLOSE,
      };
    case STUDENT_PROFILE_ACTION.MODAL_OPEN:
      return {
        ...state,
        modalState: enumState.VISIBLE,
      };

    case STUDENT_PROFILE_ACTION.UPDATE_ACTIVE:
      return {
        ...state,
        active: +payload,
      };

    case STUDENT_PROFILE_ACTION.UPDATE_AVATAR_ACCOUNT:
      state.account.srcImage = payload;
      return {
        ...state,
      };

    case STUDENT_PROFILE_ACTION.UPDATE_GENDER:
      return {
        ...state,
        account: {
          ...state.account,
          gender: +payload,
        },
      };

    case STUDENT_PROFILE_ACTION.UPDATE_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          name: {
            ...state.error.name,
            ...payload.name,
          },
          email: {
            ...state.error.email,
            ...payload.email,
          },
        },
      };

    case STUDENT_PROFILE_ACTION.UPDATE_EMAIL_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          email: {
            ...state.error.email,
            ...payload,
          },
        },
      };

    case STUDENT_PROFILE_ACTION.UPDATE_ERROR_CHANGE_PASSWORD_ALL:
      return {
        ...state,
        error: {
          ...state.error,
          oldPassword: {
            ...state.error.oldPassword,
            ...payload.oldPassword,
          },
          newPassword: {
            ...state.error.newPassword,
            ...payload.newPassword,
          },
          confirmNewPassword: {
            ...state.error.confirmNewPassword,
            ...payload.confirmNewPassword,
          },
        },
      };

    case STUDENT_PROFILE_ACTION.UPDATE_ERROR_OLD_PASSWORD:
      return {
        ...state,
        error: {
          ...state.error,
          oldPassword: {
            ...state.error.oldPassword,
            ...payload,
          },
        },
      };

    case STUDENT_PROFILE_ACTION.UPDATE_ERROR_CONFIRM_NEW_PASSWORD:
      return {
        ...state,
        error: {
          ...state.error,
          confirmNewPassword: {
            ...state.error.confirmNewPassword,
            ...payload,
          },
        },
      };

    case STUDENT_PROFILE_ACTION.UPDATE_COURSE_JOIN:
      return {
        ...state,
        courseJoin: [...payload],
      };

    case STUDENT_PROFILE_ACTION.UPDATE_COURSE_FAVORITE:
      return {
        ...state,
        courseFavorites: [...payload],
      };
    case STUDENT_PROFILE_ACTION.REMOVE_SINGLE_COURSE:
      return {
        ...state,
        courseFavorites: state.courseFavorites.filter(
          (course) => +course.id !== +payload
        ),
      };
    default:
      return state;
  }
};

export const STUDENT_PROFILE_ACTION = {
  INIT_DATA: 0,
  MODAL_CLOSE: 1,
  MODAL_OPEN: 2,
  UPDATE_ACTIVE: 3,
  UPDATE_AVATAR_ACCOUNT: 4,
  UPDATE_GENDER: 5,
  UPDATE_ERROR: 6,
  UPDATE_EMAIL_ERROR: 7,
  UPDATE_ERROR_CHANGE_PASSWORD_ALL: 8,
  UPDATE_ERROR_OLD_PASSWORD: 9,
  UPDATE_ERROR_CONFIRM_NEW_PASSWORD: 10,
  UPDATE_COURSE_JOIN: 11,
  UPDATE_COURSE_FAVORITE: 12,
  REMOVE_SINGLE_COURSE: 13,
};

export const enumState = {
  HIDDEN: "hidden",
  CLOSE: "close",
  VISIBLE: "visible",
};
