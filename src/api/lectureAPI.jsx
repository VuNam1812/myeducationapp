import axios from "axios";
import axiosClient from "./axiosClient";

const lectureApi = {
  getAll: () => {
    const url = "lectures";
    return axiosClient.get(url);
  },
  getSingle: (id, data) => {
    const url = `lectures/${id}`;
    return axiosClient.get(url, { params: { ...data } });
  },

  getLinkUpload: (data) => {
    const url = `lectures/linkUpload`;
    return axiosClient.get(url, { params: { ...data } });
  },

  create: (data) => {
    const url = `lectures`;
    return axiosClient.post(url, data);
  },

  uploadVideo: (url, data, config = {}, onUploadProgress) => {
    return axios.put(url, data, {
      headers: { ...config },
      onUploadProgress: onUploadProgress,
    });
  },

  updateInfo: (id, data) => {
    const url = `lectures/${id}`;
    return axiosClient.patch(url, data);
  },

  delete: (id) => {
    const url = `lectures/${id}`;
    return axiosClient.delete(url);
  },
};
export default lectureApi;
