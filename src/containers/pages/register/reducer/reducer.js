export const ACTION = {
  UPDATE_DATA: 1,
  UPDATE_GENDER: 2,
  UPDATE_STEP: 3,
};

export const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case ACTION.UPDATE_DATA:
      return {
        ...state,
        account: {
          ...state.account,
          ...payload,
          permission: 2,
        },
      };
    case ACTION.UPDATE_STEP:
      return {
        ...state,
        step: payload,
      };

    case ACTION.UPDATE_GENDER:
      return {
        ...state,
        account: {
          ...state.account,
          gender: payload,
        },
      };
    default:
      return state;
  }
};
