import axiosClient from "./axiosClient";
import axios from "axios";
const accountApi = {
  createAccount: (data) => {
    const url = "accounts";
    return axiosClient.post(url, { ...data });
  },
  getAll: (data) => {
    const url = "accounts";
    return axiosClient.get(url, { params: { ...data } });
  },
  getSingle: (id, data) => {
    const url = `accounts/${id}`;
    return axiosClient.get(url, { params: { ...data } });
  },

  getCourseJoin: (id, data = {}) => {
    const url = `accounts/${id}/coursesJoin`;
    return axiosClient.get(url, { params: { ...data } });
  },
  getCourseFavorite: (id, data = {}) => {
    const url = `accounts/${id}/coursesFavorite`;
    return axiosClient.get(url, { params: { ...data } });
  },

  getLinkUpload: (data = {}) => {
    const url = `accounts/linkUpload`;
    return axiosClient.get(url, { params: { ...data } });
  },

  checkEmailAvailable: (data) => {
    const url = `accounts/available`;
    return axiosClient.get(url, { params: { ...data } });
  },

  checkPassword: (data) => {
    const url = "accounts/verify";
    return axiosClient.get(url, { params: { ...data } });
  },

  uploadAvatar: (url, data, config = {}) => {
    return axios.put(url, data, { headers: { ...config } });
  },

  updateInfo: (id, data) => {
    const url = `accounts/${id}`;
    return axiosClient.patch(url, { ...data });
  },

  updateActive: (id, data) => {
    const url = `accounts/${id}/active`;
    return axiosClient.patch(url, { ...data });
  },
};
export default accountApi;
