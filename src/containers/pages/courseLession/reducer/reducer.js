export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case LESSION_ACTION.UPDATE_COURSE:
      return {
        ...state,
        course: { ...payload },
      };
    case LESSION_ACTION.UPDATE_LESSION:
      return {
        ...state,
        lessions: [...payload],
      };
    case LESSION_ACTION.UPDATE_ACTIVE:
      return {
        ...state,
        active: +payload,
      };

    case LESSION_ACTION.UPDATE_VIDEO:
      return {
        ...state,
        video: {
          ...payload,
        },
      };
    default:
      return state;
  }
};

export const LESSION_ACTION = {
  UPDATE_COURSE: 0,
  UPDATE_LESSION: 1,
  UPDATE_ACTIVE: 2,
  UPDATE_VIDEO: 3,
};
