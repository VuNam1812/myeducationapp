import axiosClient from "./axiosClient";

const userLessionApi = {
  getAll: () => {
    const url = "userlessions";
    return axiosClient.get(url);
  },
  
  updateInfo: (data = {}) => {
    const url = "userlessions";
    return axiosClient.put(url, { ...data });
  },
};
export default userLessionApi;
