export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case COURSES_ACTION.UPDATE_INIT:
      return {
        ...state,
        search: payload.search,
        title: payload.title,
      };
    case COURSES_ACTION.UPDATE_COURSES:
      return {
        ...state,
        courses: [...payload.courses],
      };

    case COURSES_ACTION.UPDATE_RENDER_LIST:
      return {
        ...state,
        renderList: [...payload],
      };
    case COURSES_ACTION.UPDATE_PAGINATION:
      return {
        ...state,
        pagination: [...payload],
      };

    case COURSES_ACTION.UPDATE_PAGE_ACTIVE:
      return {
        ...state,
        pageActive: +payload,
      };

    case COURSES_ACTION.UPDATE_VIEW_ITEM:
      return {
        ...state,
        direct: +payload.direct,
        limit: +payload.limit,
        pageActive: +payload.pageActive,
      };

    case COURSES_ACTION.UPDATE_FILTER:
      return {
        ...state,
        filter: +payload,
      };
    case COURSES_ACTION.UPDATE_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

export const COURSES_ACTION = {
  UPDATE_INIT: 0,
  UPDATE_COURSES: 1,
  UPDATE_RENDER_LIST: 2,
  UPDATE_PAGINATION: 3,
  UPDATE_PAGE_ACTIVE: 4,
  UPDATE_VIEW_ITEM: 5,
  UPDATE_FILTER: 6,
  UPDATE_LOADING: 7,
};
