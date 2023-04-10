import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./cookies";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("ACCESS_TOKEN");
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    if (response.headers.authorization) {
      const re_access_token = response.headers.authorization.split("")[1];
      removeCookie("ACCESS_TOKEN");
      setCookie("ACCESS_TOKEN", re_access_token);
    } else {
    }
    return response;
  },

  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 400) {
      console.log("400에러");
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("401에러");

      try {
        originalRequest._retry = true;

        const refresh_token = localStorage.getItem("REFRESH_TOKEN");
        originalRequest.headers["RefreshToken"] = `Bearer ${refresh_token}`;
        return instance(originalRequest);
      } catch (error) {
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("name");
        removeCookie("ACCESS_TOKEN");
        alert("다시 로그인하세욧!");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
export default instance;
