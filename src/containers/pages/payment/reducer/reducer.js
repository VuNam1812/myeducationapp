export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case PAY_ACTION.INIT_DATA:
      return {
        ...state,
      };
    case PAY_ACTION.UPDATE_ACTIVE:
      return {
        ...state,
        active: +payload,
      };

    case PAY_ACTION.UPDATE_COURSE:
      return {
        ...state,
        course: {
          ...payload,
        },
      };

    case PAY_ACTION.UPDATE_ACCOUNT:
      return {
        ...state,
        user: {
          ...payload,
        },
      };
    default:
      return state;
  }
};

export const PAY_ACTION = {
  INIT_DATA: 0,
  UPDATE_ACTIVE: 1,
  UPDATE_COURSE: 2,
  UPDATE_ACCOUNT: 3,
};
