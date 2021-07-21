export const ADMIN_PROFILE_ACTION = {
  ACTIVE_DASHBOARD: 1,
  ACTIVE_COURSES: 2,
  ACTIVE_CATEGORIES: 3,
  ACTIVE_ACCOUNTS: 4,
  UPDATE_ACCOUNT: 5,
  UPDATE_AVATAR_ACCOUNT: 6,
  UPDATE_COURSES: 7,
  UPDATE_TEACHERS: 8,
  UPDATE_SINGLE_COURSE: 9,
  UPDATE_USERS: 10,
  UPDATE_SINGLE_USER: 11,
  UPDATE_SINGLE_TEACHER: 12,
  ADD_TEACHER: 13,
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_PROFILE_ACTION.ACTIVE_DASHBOARD:
      return {
        ...state,
        currectActive: 1,
      };
    case ADMIN_PROFILE_ACTION.ACTIVE_COURSES:
      return {
        ...state,
        currectActive: 2,
      };
    case ADMIN_PROFILE_ACTION.ACTIVE_CATEGORIES:
      return {
        ...state,
        currectActive: 3,
      };
    case ADMIN_PROFILE_ACTION.ACTIVE_ACCOUNTS:
      return {
        ...state,
        currectActive: 4,
      };

    case ADMIN_PROFILE_ACTION.UPDATE_ACCOUNT:
      return {
        ...state,
        account: {
          ...payload,
        },
      };

    case ADMIN_PROFILE_ACTION.UPDATE_AVATAR_ACCOUNT:
      return {
        ...state,
        account: {
          ...state.account,
          srcImage: payload,
        },
      };

    case ADMIN_PROFILE_ACTION.UPDATE_COURSES:
      return {
        ...state,
        courses: [...payload],
      };
    case ADMIN_PROFILE_ACTION.UPDATE_TEACHERS:
      return {
        ...state,
        teachers: [...payload],
      };

    case ADMIN_PROFILE_ACTION.UPDATE_SINGLE_COURSE:
      let indexCourse = state.courses.findIndex(
        (course) => course.id === payload.id
      );

      return {
        ...state,
        courses: [...state.courses.fill(payload, indexCourse, indexCourse + 1)],
      };

    case ADMIN_PROFILE_ACTION.UPDATE_USERS:
      return {
        ...state,
        users: [...payload],
      };

    case ADMIN_PROFILE_ACTION.UPDATE_SINGLE_USER:
      let index = state.users.findIndex((user) => user.id === payload.id);

      return {
        ...state,
        users: state.users.fill(payload, index, index + 1),
      };

    case ADMIN_PROFILE_ACTION.UPDATE_SINGLE_TEACHER:
      let indexTea = state.teachers.findIndex((user) => user.id === payload.id);
      return {
        ...state,
        teachers: state.teachers.fill(payload, indexTea, indexTea + 1),
      };

    case ADMIN_PROFILE_ACTION.ADD_TEACHER:
      return {
        ...state,
        teachers: [...state.teachers, payload],
      };
    default:
      return state;
  }
};
