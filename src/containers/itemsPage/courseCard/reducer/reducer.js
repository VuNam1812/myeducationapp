export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case CARD_ACTION.UPDATE_PAID:
      return {
        ...state,
        paid: payload,
      };
    case CARD_ACTION.UPDATE_IN_FAVORITE_LIST:
      return {
        ...state,
        inFavoriteList: payload,
      };
    case CARD_ACTION.UPDATE_OWNER:
      return {
        ...state,
        owner: payload,
      };
    default:
      return state;
  }
};

export const CARD_ACTION = {
  UPDATE_PAID: 1,
  UPDATE_IN_FAVORITE_LIST: 2,
  UPDATE_OWNER: 3,
};
