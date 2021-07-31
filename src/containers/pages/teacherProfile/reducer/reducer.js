export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case TEACHER_PROFILE_ACTION.INIT_DATA:
      return {
        ...state,
        account: {
          ...payload,
        },
      };
    case TEACHER_PROFILE_ACTION.UPDATE_ACTIVE:
      return {
        ...state,
        active: +payload,
      };
    case TEACHER_PROFILE_ACTION.UPDATE_COURSES:
      return {
        ...state,
        courses: [...payload],
      };
    case TEACHER_PROFILE_ACTION.UPDATE_SINGLE_COURSE:
      let indexCourse = +state.courses.findIndex(
        (course) => course.id === payload.id
      );
      let newCourses = state.courses.fill(
        payload,
        indexCourse,
        indexCourse + 1
      );
      return {
        ...state,
        courses: [...newCourses],
      };
    case TEACHER_PROFILE_ACTION.UPDATE_AVATAR_ACCOUNT:
      state.account.srcImage = payload;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const TEACHER_PROFILE_ACTION = {
  INIT_DATA: 0,
  UPDATE_ACTIVE: 1,
  UPDATE_COURSES: 2,
  UPDATE_SINGLE_COURSE: 3,
  UPDATE_AVATAR_ACCOUNT: 4,
};
