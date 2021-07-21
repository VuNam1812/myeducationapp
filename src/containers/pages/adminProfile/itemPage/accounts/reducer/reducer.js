export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACCOUNT_ADMIN_ACTION.MODAL_CLOSE:
      return {
        ...state,
        modalState: enumState.CLOSE,
      };

    case ACCOUNT_ADMIN_ACTION.MODAL_OPEN:
      return {
        ...state,
        modalState: enumState.VISIBLE,
      };
    case ACCOUNT_ADMIN_ACTION.UPDATE_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          firstName: {
            ...state.error.firstName,
            isShow: payload[0],
          },
          lastName: {
            ...state.error.lastName,
            isShow: payload[1],
          },
          email: {
            ...state.error.email,
            isShow: payload[2],
          },
          password: {
            ...state.error.password,
            isShow: payload[3],
          },
        },
      };

    case ACCOUNT_ADMIN_ACTION.UPDATE_EMAIL_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          email: { ...payload },
        },
      };
    case ACCOUNT_ADMIN_ACTION.UPDATE_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

export const ACCOUNT_ADMIN_ACTION = {
  MODAL_CLOSE: 1,
  MODAL_OPEN: 2,
  UPDATE_ERROR: 3,
  UPDATE_EMAIL_ERROR: 4,
  UPDATE_LOADING: 5,
};

export const enumState = {
  HIDDEN: "hidden",
  CLOSE: "close",
  VISIBLE: "visible",
};
