export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ADMIN_ACTION.UPDATE_CAT_SELECT:
      return {
        ...state,
        catSelected: { ...payload.cat },
        active: +payload.index,
      };
    case CATEGORIES_ADMIN_ACTION.MODAL_CLOSE:
      return {
        ...state,
        modalState: enumState.CLOSE,
      };

    case CATEGORIES_ADMIN_ACTION.MODAL_CREATE_OPEN:
      return {
        ...state,
        modalState: enumState.VISIBLE,
        isCreateCategory: true,
      };

    case CATEGORIES_ADMIN_ACTION.MODAL_EDIT_OPEN:
      return {
        ...state,
        modalState: enumState.VISIBLE,
        isCreateCategory: false,
      };

    case CATEGORIES_ADMIN_ACTION.UPDATE_URL_SELECTED:
      return {
        ...state,
        urlSeleted: payload,
      };

    case CATEGORIES_ADMIN_ACTION.UPDATE_CAT_SELECT_MODAL:
      return {
        ...state,
        catSelectedModal: payload,
      };

    case CATEGORIES_ADMIN_ACTION.UPDATE_ERROR_CAT_NAME:
      return {
        ...state,
        error: {
          ...state.error,
          catName: {
            ...state.error.catName,
            ...payload,
          },
        },
      };
    default:
      return state;
  }
};

export const CATEGORIES_ADMIN_ACTION = {
  UPDATE_CAT_SELECT: 1,
  MODAL_CLOSE: 2,
  MODAL_CREATE_OPEN: 3,
  UPDATE_URL_SELECTED: 4,
  UPDATE_CAT_SELECT_MODAL: 5,
  MODAL_EDIT_OPEN: 6,
  UPDATE_ERROR_CAT_NAME: 7,
};

export const enumState = {
  HIDDEN: "hidden",
  CLOSE: "close",
  VISIBLE: "visible",
};
