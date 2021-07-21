// @flow
import React, { useReducer } from "react";
import { reducer, AUTH_ACTION } from "./reducer";
import authApi from "../../api/authAPI";
export const authContext = React.createContext();

const initData = {
  auth: false,
  account: {},
};

export const AuthProvider = ({ children }) => {
  const [store_auth, dispatch_auth] = useReducer(reducer, initData);

  const checkAuth = async () => {
    localStorage.udemyapp_accessToken = "";
    localStorage.udemyapp_refreshToken = "";
    const res = await authApi.checkAuth();
    if (res.authenticated) {
      dispatch_auth({
        type: AUTH_ACTION.UPDATE_AUTH,
        payload: res.authenticated,
      });
      dispatch_auth({
        type: AUTH_ACTION.UPDATE_ACCOUNT,
        payload: res.accountInfo,
      });
    }
  };

  const logoutUser = async () => {
    const res = await authApi.logout();

    if (!res.authenticated) {
      dispatch_auth({
        type: AUTH_ACTION.UPDATE_AUTH,
        payload: res.authenticated,
      });
      dispatch_auth({
        type: AUTH_ACTION.DELETE_ACCOUNT,
      });
      localStorage.udemyapp_accessToken = "";
      localStorage.udemyapp_refreshToken = "";
    }
  };

  const exportContext = {
    store_auth,
    checkAuth: checkAuth,
    logoutUser: logoutUser,
    dispatch_auth,
  };

  return (
    <authContext.Provider value={exportContext}>
      {children}
    </authContext.Provider>
  );
};
