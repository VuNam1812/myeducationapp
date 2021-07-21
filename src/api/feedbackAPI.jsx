import axiosClient from "./axiosClient";

const feedbackApi = {
  getSingle: (id, data = {}) => {
    const url = `feedbacks/${id}`;
    return axiosClient.get(url, { params: { ...data } });
  },

};
export default feedbackApi;
