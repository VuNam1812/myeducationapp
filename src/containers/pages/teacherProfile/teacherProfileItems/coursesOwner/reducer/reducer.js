export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case COURSES_OWNER_ACTION.UPDATE_COURSE:
      return {
        ...state,
        renderList: [...payload],
      };
    case COURSES_OWNER_ACTION.UPDATE_FILTER_CHARACTER:
      return {
        ...state,
        filterCharacter: +payload,
      };
    case COURSES_OWNER_ACTION.UPDATE_ACTIVE:
      return {
        ...state,
        active: +payload,
      };

    case COURSES_OWNER_ACTION.MODAL_CLOSE:
      return {
        ...state,
        modalState: enumState.CLOSE,
      };

    case COURSES_OWNER_ACTION.MODAL_OPEN:
      return {
        ...state,
        modalState: enumState.VISIBLE,
      };

    case COURSES_OWNER_ACTION.UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...payload],
      };

    case COURSES_OWNER_ACTION.UPDATE_COURSE_SELECT:
      return {
        ...state,
        courseSelect: { ...payload },
      };
    case COURSES_OWNER_ACTION.UPDATE_SEARCH:
      return {
        ...state,
        searchText: payload,
      };
    default:
      return state;
  }
};

export const COURSES_OWNER_ACTION = {
  UPDATE_COURSE: 0,
  UPDATE_FILTER_CHARACTER: 1,
  UPDATE_ACTIVE: 2,
  MODAL_CLOSE: 3,
  MODAL_OPEN: 4,
  UPDATE_CATEGORIES: 5,
  UPDATE_COURSE_SELECT: 6,
  UPDATE_SEARCH: 7,
};

export const enumState = {
  HIDDEN: "hidden",
  CLOSE: "close",
  VISIBLE: "visible",
};
