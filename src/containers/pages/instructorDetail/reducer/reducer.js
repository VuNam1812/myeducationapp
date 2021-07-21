export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case INSTRUCTOR_DETAIL_ACTION.INIT_DATA:
      return {
        ...state,
        teacherInfo: {
          ...payload.teacher,
        },
      };
    case INSTRUCTOR_DETAIL_ACTION.UPDATE_COURSES:
      return {
        ...state,
        courses: [...payload.courses],
      };
    default:
      return state;
  }
};

export const INSTRUCTOR_DETAIL_ACTION = {
  INIT_DATA: 0,
  UPDATE_COURSES: 1,
};
