import axiosClient from "./axiosClient";

const authApi = {
  checkAvailable: (data) => {
    const url = "auth/is-available";
    return axiosClient.get(url, { params: { ...data } });
  },
  confirmCode: (code) => {
    const url = "auth/is-confirmEmail";
    return axiosClient.get(url, { params: { code: code } });
  },
  login: (data) => {
    const url = "auth/login";
    return axiosClient.post(url, { ...data });
  },

  facebookLogin: (data) => {
    const url = "auth/facebookLogin";
    return axiosClient.post(url, { ...data });
  },

  googleLogin: (data) => {
    const url = "auth/googleLogin";
    return axiosClient.post(url, { ...data });
  },

  logout: () => {
    const url = "auth/logout";
    return axiosClient.post(url);
  },

  checkAuth: () => {
    const url = "auth";
    return axiosClient.get(url);
  },
};
export default authApi;
