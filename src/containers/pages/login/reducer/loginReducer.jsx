export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTION.UPDATE_ALL:
      return {
        ...state,
        error: {
          email: {
            ...state.error.email,
            isShow: payload[0],
          },
          password: {
            ...state.error.password,
            isShow: payload[1],
          },
        },
      };
    case ACTION.UPDATE_DATA_LOGIN:
      return {
        ...state,
        login: {
          email: payload.email,
          password: payload.password,
        },
      };
    default:
      return state;
  }
};

export const ACTION = {
  UPDATE_ALL: 1,
  UPDATE_DATA_LOGIN: 2,
};
