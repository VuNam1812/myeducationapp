import { ACTION } from "../reducer/loginReducer.jsx";

export const handleValidate = {
  validateAll: (data, dispatch) => {
    const email = {
      isShow: data.email.length === 0 ? true : false,
    };
    const password = {
      isShow: data.password.length === 0 ? true : false,
    };

    const flag = +email.isShow + +password.isShow;
    if (+flag > 0) {
      dispatch({
        type: ACTION.UPDATE_ALL,
        payload: [email.isShow, password.isShow],
      });
    }

    return +flag > 0 ? false : true;
  },
};
