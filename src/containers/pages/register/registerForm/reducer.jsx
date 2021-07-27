export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTION.UPDATE_ALL:
      return {
        ...state,
        name: { ...state.name, show: payload[0] },
        email: { ...state.email, show: payload[1] },
        password: { ...state.password, show: payload[2] },
        confirmPassword: { ...state.confirmPassword, show: payload[3] },
      };
    case ACTION.UPDATE_ERROR_CONFIRMPASSWORD:
      return {
        ...state,
        confirmPassword: { ...payload },
      };
    case ACTION.UPDATE_ERROR_EMAIL:
      return {
        ...state,
        email: { ...payload },
      };
    default:
      return state;
  }
};

export const ACTION = {
  UPDATE_ALL: 1,
  UPDATE_ERROR_CONFIRMPASSWORD: 2,
  UPDATE_ERROR_EMAIL: 3,
};
