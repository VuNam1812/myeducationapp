export const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case AUTH_ACTION.UPDATE_AUTH:
      return {
        ...state,
        auth: payload,
      };
    case AUTH_ACTION.UPDATE_ACCOUNT:
      let role = "";
      switch (+payload.role) {
        case 0:
          role = "Quản trị viên";
          break;
        case 1:
          role = "Giảng viên";
          break;
        case 2:
          role = "Học viên";
          break;
        default:
          break;
      }

      return {
        ...state,
        account: {
          ...state.accounts,
          id: payload.id,
          name: payload.name,
          role: role,
          permission: payload.role,
          srcImage: payload.srcImage,
        },
      };

    case AUTH_ACTION.DELETE_ACCOUNT:
      return {
        ...state,
        account: {},
      };

    case AUTH_ACTION.UPDATE_AVATAR_ACCOUNT:
      return {
        ...state,
        account: {
          ...state.account,
          srcImage: payload,
        },
      };

    case AUTH_ACTION.UPDATE_NAME_ACCOUNT:
      state.account.name = payload;
      return {
        ...state,
        account: state.account,
      };

    default:
      return state;
  }
};

export const AUTH_ACTION = {
  UPDATE_AUTH: 1,
  UPDATE_ACCOUNT: 2,
  DELETE_ACCOUNT: 3,
  UPDATE_AVATAR_ACCOUNT: 4,
  UPDATE_NAME_ACCOUNT: 5,
};
