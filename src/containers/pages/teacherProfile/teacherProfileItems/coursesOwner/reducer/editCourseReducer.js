export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case EDIT_COURSE_ACTION.UPDATE_CAT_SELECT:
      return {
        ...state,
        categories: {
          ...state.categories,
          cateSelected: payload,
        },
      };
    case EDIT_COURSE_ACTION.UPDATE_IS_SUBCAT:
      return {
        ...state,
        categories: {
          ...state.categories,
          isSubCate: payload,
        },
      };

    case EDIT_COURSE_ACTION.UPDATE_PARENT_CAT:
      return {
        ...state,
        categories: {
          ...state.categories,
          parentCat: +payload,
        },
      };

    case EDIT_COURSE_ACTION.UPDATE_CHILDREN_CAT:
      return {
        ...state,
        categories: {
          ...state.categories,
          childrenCat: +payload,
        },
      };

    case EDIT_COURSE_ACTION.UPDATE_FULL_DESC:
      return {
        ...state,
        fullDesEditor: payload,
      };

    case EDIT_COURSE_ACTION.UPDATE_LESSION:
      return {
        ...state,
        lessions: [...payload],
      };

    case EDIT_COURSE_ACTION.ADD_LESSION:
      return {
        ...state,
        lessions: [...state.lessions, payload],
      };

    case EDIT_COURSE_ACTION.UPDATE_SINGLE_LESSION:
      let index = +state.lessions.findIndex((value) => value.id === payload.id);

      return {
        ...state,
        lessions: [...state.lessions.fill(payload, index, index + 1)],
      };

    case EDIT_COURSE_ACTION.DELETE_SINGLE_LESSION:
      return {
        ...state,
        lessions: [
          ...state.lessions.filter((lession) => +lession.id !== +payload),
        ],
      };
    default:
      return state;
  }
};

export const EDIT_COURSE_ACTION = {
  UPDATE_CAT_SELECT: 1,
  UPDATE_IS_SUBCAT: 2,
  UPDATE_PARENT_CAT: 3,
  UPDATE_CHILDREN_CAT: 4,
  UPDATE_FULL_DESC: 5,
  UPDATE_LESSION: 6,
  ADD_LESSION: 7,
  UPDATE_SINGLE_LESSION: 8,
  DELETE_SINGLE_LESSION: 9,
};
