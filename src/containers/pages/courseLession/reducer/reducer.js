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
    case LESSION_ACTION.UPDATE_SINGLE_LESSIONS:
      const lession = replacePayloadLession(payload, state.lessions);
      const index = state.lessions.findIndex((less) => less.id === lession.id);
      return {
        ...state,
        lessions: state.lessions.fill(lession, index, index + 1),
      };
    case LESSION_ACTION.UPDATE_VIDEO_COMPLETE:
      state.video.isCompleted = payload;
      return {
        ...state,
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
  UPDATE_SINGLE_LESSIONS: 4,
  UPDATE_VIDEO_COMPLETE: 5,
};

const replacePayloadLession = (payload, lessions) => {
  const lession = lessions.filter((lession) => {
    return (
      lession.lectures.filter((lecture) => +lecture.id === +payload.id)
        .length !== 0
    );
  })[0];

  lession.lectures.filter(
    (lecture) => lecture.id === payload.id
  )[0].lastSeconds = payload.lastSeconds;
  if (payload.isCompleted) {
    lession.lectures.filter(
      (lecture) => lecture.id === payload.id
    )[0].isCompleted = payload.isCompleted;
  }

  return lession;
};
