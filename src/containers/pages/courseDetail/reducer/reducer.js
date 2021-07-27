export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case COURSE_DETAIL_ACTION.INIT_DATA:
      return {
        ...state,
        course: {
          ...payload.course,
        },
      };
    case COURSE_DETAIL_ACTION.UPDATE_TEACHER:
      return {
        ...state,
        teacher: {
          ...state.teacher,
          ...payload.teacher,
        },
      };

    case COURSE_DETAIL_ACTION.UPDATE_LESSION:
      return {
        ...state,
        lectures: [...payload.lectures],
      };

    case COURSE_DETAIL_ACTION.UPDATE_FEEDBACK:
      return {
        ...state,
        feedbacks: { ...payload.feedbacks },
      };

    case COURSE_DETAIL_ACTION.UPDATE_COURSE_CAT:
      return {
        ...state,
        coursesCat: [...payload.coursesCat],
      };

    case COURSE_DETAIL_ACTION.UPDATE_PAID:
      return {
        ...state,
        paid: payload,
      };
    case COURSE_DETAIL_ACTION.UPDATE_IN_FAVOTIRE:
      return {
        ...state,
        inFavoriteList: payload,
      };

    case COURSE_DETAIL_ACTION.ADD_FEEDBACK:
      state.feedbacks.feedbacks.unshift(payload.newFeedback);
      return {
        ...state,
        feedbacks: {
          ...state.feedbacks,
          feedbacks: state.feedbacks.feedbacks,
          rate: [...payload.rate],
        },
      };
    case COURSE_DETAIL_ACTION.UPDATE_RATE_COURSE:
      return {
        ...state,
        course: {
          ...state.course,
          rate: +payload.rate,
          feedbackCount: +payload.feedbackCount,
        },
      };
    case COURSE_DETAIL_ACTION.UPDATE_RATE_TEACHER:
      return {
        ...state,
        teacher: {
          ...state.teacher,
          rate: payload,
        },
      };

    case COURSE_DETAIL_ACTION.UPDATE_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case COURSE_DETAIL_ACTION.LOADMORE_FEEDBACK:
      return {
        ...state,
        feedbacks: {
          ...state.feedbacks,
          feedbacks: [...state.feedbacks.feedbacks, ...payload],
        },
      };
    default:
      return state;
  }
};

export const COURSE_DETAIL_ACTION = {
  INIT_DATA: 0,
  UPDATE_TEACHER: 1,
  UPDATE_LESSION: 2,
  UPDATE_FEEDBACK: 3,
  UPDATE_COURSE_CAT: 4,
  UPDATE_PAID: 5,
  UPDATE_IN_FAVOTIRE: 6,
  ADD_FEEDBACK: 7,
  UPDATE_RATE_COURSE: 8,
  UPDATE_RATE_TEACHER: 9,
  UPDATE_LOADING: 10,
  LOADMORE_FEEDBACK: 11,
};
