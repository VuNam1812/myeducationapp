export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case HOME_ACTION.UPDATE_TOP_NEW:
      return {
        ...state,
        topNew: [...payload],
      };
    case HOME_ACTION.UPDATE_TOP_VIEW:
      return {
        ...state,
        topView: [...payload],
      };
    case HOME_ACTION.UPDATE_TOP_RATE:
      return {
        ...state,
        topRate: [...payload],
      };
    case HOME_ACTION.UPDATE_TOP_CAT:
      return {
        ...state,
        topCats: [...payload.topJoin],
      };
    default:
      return state;
  }
};

export const HOME_ACTION = {
  UPDATE_TOP_NEW: 0,
  UPDATE_TOP_VIEW: 1,
  UPDATE_TOP_RATE: 2,
  UPDATE_TOP_CAT: 3,
};
