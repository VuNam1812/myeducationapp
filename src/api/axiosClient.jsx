import axios from "axios";
import queryString from "query-string";
// Set up default config for http requests here
//"https://udemy-1612407.herokuapp.com/api"
let isTokenExpired = false;
let refreshTokenRequest = null;
const axiosClient = axios.create({
  baseURL: "https://udemy-1612407.herokuapp.com/api",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.request.use(async (config) => {
  if (isTokenExpired) {
    refreshTokenRequest = refreshTokenRequest
      ? refreshTokenRequest
      : refreshAccessToken();

    const newToken = await refreshTokenRequest;
    localStorage.udemyapp_accessToken = newToken;

    refreshTokenRequest = null;

    isTokenExpired = false;
  }
  config.headers["x-access-token"] = localStorage.udemyapp_accessToken;
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      if (response.data.accessToken) {
        localStorage.udemyapp_accessToken = response.data.accessToken;
      }
      if (response.data.refreshToken) {
        localStorage.udemyapp_refreshToken = response.data.refreshToken;
      }
      if (response.data.error && response.data.error === "Token expired") {
        isTokenExpired = true;
        const originRequest = { ...response.config };
        return axiosClient(originRequest);
      }

      return response.data;
    }
  },
  (error) => {
    throw error;
  }
);

const refreshAccessToken = async () => {
  const url = "https://udemy-1612407.herokuapp.com/api/auth/refresh";
  const newToken = await axios.post(url, {
    accessToken: localStorage.udemyapp_accessToken,
    refreshToken: localStorage.udemyapp_refreshToken,
  });

  return newToken.data.accessToken;
};

export default axiosClient;
