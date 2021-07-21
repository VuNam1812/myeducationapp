import axiosClient from "./axiosClient";

const chapterApi = {
  getSingle: (id, data = {}) => {
    const url = `chapters/${id}`;
    return axiosClient.get(url, { params: { ...data } });
  },

  updateInfo: (id, data = {}) => {
    const url = `chapters/${id}`;
    return axiosClient.patch(url, { ...data });
  },

  create: (data) => {
    const url = `chapters`;
    return axiosClient.post(url, { ...data });
  },

  deleteChapter: (id) => {
    const url = `chapters/${id}`;
    return axiosClient.delete(url);
  },
};
export default chapterApi;
