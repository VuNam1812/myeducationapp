import axiosClient from "./axiosClient";
import axios from "axios";

const categoryApi = {
  getAll: (filter = {}) => {
    const url = "categories";
    return axiosClient.get(url, { params: { ...filter } });
  },

  getAllCourseByCatId: (id, data = {}) => {
    const url = `categories/${id}/courses`;
    return axiosClient.get(url, { params: { ...data } });
  },

  getSingle: (id, data = {}) => {
    const url = `categories/${id}`;
    return axiosClient.get(url, { params: { ...data } });
  },

  getLinkUpload: (data = {}) => {
    const url = `categories/linkUpload`;
    return axiosClient.get(url, { params: { ...data } });
  },

  create: (data) => {
    const url = `categories`;
    return axiosClient.post(url, data);
  },

  checkAvailable: (data) => {
    const url = `categories/available`;
    return axiosClient.get(url, { params: { ...data } });
  },

  updateInfo: (id, data) => {
    const url = `categories/${id}`;
    return axiosClient.patch(url, data);
  },

  uploadImage: (url, data, config = {}) => {
    return axios.put(url, data, { headers: { ...config } });
  },

  checkDelete: (id) => {
    const url = `categories/${id}/can-Delete`;
    return axiosClient.get(url);
  },

  delete: (id) => {
    const url = `categories/${id}`;
    return axiosClient.delete(url);
  },
};
export default categoryApi;
