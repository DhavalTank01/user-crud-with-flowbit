import axios from "axios";
import { APIS } from "./apis";
import secureLocalStorage from "react-secure-storage";
import { clearAllCookies, getCookie } from "../utils";
import URLS from "../Routes";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: APIS.BASE_URL,
  headers: {
    timeout: 1000,
  },
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error?.response?.status === 401) {
      if (
        [
          APIS.LOGIN,
          APIS.SEND_OTP,
          APIS.LOGIN_WITH_OTP,
          APIS.FORGOT_PASSWORD,
        ].includes(error?.response?.config?.url)
      ) {
        return Promise.resolve(error.response);
      } else {
        toast.error(error?.response?.data?.message || "Something went wrong");
        secureLocalStorage.clear();
        clearAllCookies();
        window.location.href = URLS.Login;
      }
    }
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token =
      (secureLocalStorage.getItem("token") || getCookie("backupToken")) ?? null;
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] =
      config.headers["Content-Type"] || "application/json";
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
