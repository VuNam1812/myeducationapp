export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case INFO_TEACHER_ACTION.UPDATE_INTRO_EDITOR:
      return {
        ...state,
        introEditor: payload,
      };
    case INFO_TEACHER_ACTION.UPDATE_TECHNIQUE_EDITOR:
      return {
        ...state,
        techniqueEditor: payload,
      };
    case INFO_TEACHER_ACTION.UPDATE_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

export const INFO_TEACHER_ACTION = {
  UPDATE_INTRO_EDITOR: 0,
  UPDATE_TECHNIQUE_EDITOR: 1,
  UPDATE_LOADING: 2,
};
