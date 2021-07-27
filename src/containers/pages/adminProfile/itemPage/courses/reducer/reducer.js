export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case COURSES_ADMIN_ACTION.INIT_PAGINATION:
      let pageInit = new Array(+payload).fill(null).map((index) => ({
        active: "",
      }));
      pageInit[0].active = "pagination__item--active";
      return {
        ...state,
        pagination: [...pageInit],
      };
    case COURSES_ADMIN_ACTION.UPDATE_PAGINATION:
      let page = new Array(state.pagination.length).fill(null).map(() => ({
        active: "",
      }));
      page[+payload - 1].active = "pagination__item--active";
      return {
        ...state,
        pagination: [...page],
      };
    case COURSES_ADMIN_ACTION.UPDATE_LISTRENDER:
      return {
        ...state,
        listRender: [
          ...payload.courses.slice(
            (payload.page - 1) * state.limit,
            payload.page * state.limit
          ),
        ],
      };
    case COURSES_ADMIN_ACTION.UPDATE_FILTER_SELECTED:
      return {
        ...state,
        filterSelected: +payload,
      };
    case COURSES_ADMIN_ACTION.UPDATE_PARENT_CAT_SELECTED:
      return {
        ...state,
        parentCatSelect: +payload,
      };
    case COURSES_ADMIN_ACTION.UPDATE_SUB_CATEGORY:
      return {
        ...state,
        isSubCategory: payload,
      };

    case COURSES_ADMIN_ACTION.RESET_FILTER:
      return {
        ...state,
        parentCatSelect: -1,
        isSubCategory: false,
        catSelected: -1,
        teacherSelected: -1,
      };

    case COURSES_ADMIN_ACTION.UPDATE_CURRENT_COURSES:
      return {
        ...state,
        currentCourses: [...payload],
      };

    case COURSES_ADMIN_ACTION.UPDATE_SINGLE_COURSE:
      let indexCourse = state.currentCourses.findIndex(
        (course) => course.id === payload.id
      );
      let indexListRenderCourse = state.listRender.findIndex(
        (course) => course.id === payload.id
      );
      return {
        ...state,
        currentCourses: state.currentCourses.fill(
          payload,
          indexCourse,
          indexCourse + 1
        ),
        listRender: state.listRender.fill(
          payload,
          indexListRenderCourse,
          indexListRenderCourse + 1
        ),
      };
    case COURSES_ADMIN_ACTION.UPDATE_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

export const COURSES_ADMIN_ACTION = {
  UPDATE_PAGINATION: 1,
  UPDATE_FILTER_SELECTED: 2,
  UPDATE_LISTRENDER: 3,
  INIT_PAGINATION: 4,
  UPDATE_PARENT_CAT_SELECTED: 5,
  UPDATE_SUB_CATEGORY: 6,
  RESET_FILTER: 7,
  UPDATE_CURRENT_COURSES: 8,
  UPDATE_LOADING: 9,
  UPDATE_SINGLE_COURSE: 10,
};

export const enumState = {
  HIDDEN: "hidden",
  CLOSE: "close",
  VISIBLE: "visible",
};
