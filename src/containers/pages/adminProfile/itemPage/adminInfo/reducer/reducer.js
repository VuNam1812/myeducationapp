export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case ADMIN_INFO_ACTION.UPDATE_ACTIVE:
      return {
        ...state,
        active: payload,
      };
    case ADMIN_INFO_ACTION.UPDATE_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          name: {
            ...state.error.name,
            isShow: payload.name.isShow,
          },
          emailName: {
            ...state.error.email,
            isShow: payload.email.isShow,
          },
        },
      };

    case ADMIN_INFO_ACTION.MODAL_CLOSE:
      return {
        ...state,
        modalState: enumState.CLOSE,
      };
    case ADMIN_INFO_ACTION.MODAL_OPEN:
      return {
        ...state,
        modalState: enumState.VISIBLE,
      };

    case ADMIN_INFO_ACTION.UPDATE_ERROR_CHANGE_PASSWORD_ALL:
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

    case ADMIN_INFO_ACTION.UPDATE_ERROR_OLD_PASSWORD:
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

    case ADMIN_INFO_ACTION.UPDATE_ERROR_CONFIRM_NEW_PASSWORD:
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
    default:
      return state;
  }
};

export const ADMIN_INFO_ACTION = {
  UPDATE_ACTIVE: 3,
  UPDATE_ERROR: 2,
  MODAL_CLOSE: 1,
  MODAL_OPEN: 4,
  UPDATE_ERROR_CHANGE_PASSWORD_ALL: 8,
  UPDATE_ERROR_OLD_PASSWORD: 9,
  UPDATE_ERROR_CONFIRM_NEW_PASSWORD: 10,
};

export const enumState = {
  HIDDEN: "hidden",
  CLOSE: "close",
  VISIBLE: "visible",
};
