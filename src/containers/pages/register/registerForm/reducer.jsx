export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case ACTION.UPDATE_ALL:
      return {
        ...state,
        firstName: { ...state.firstName, show: payload[0] },
        lastName: { ...state.lastName, show: payload[1] },
        email: { ...state.email, show: payload[2] },
        dob: { ...state.dob, show: payload[3] },
        password: { ...state.password, show: payload[4] },
        confirmPassword: { ...state.confirmPassword, show: payload[5] },
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
