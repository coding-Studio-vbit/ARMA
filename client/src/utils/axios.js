import axios from "axios";

const rawServerUrl = (process.env.REACT_APP_SERVER_URL || "https://armaserver.onrender.com/").trim();
const baseURL = rawServerUrl.endsWith("/") ? rawServerUrl : rawServerUrl + "/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("arma_token") || localStorage.getItem("idk");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
