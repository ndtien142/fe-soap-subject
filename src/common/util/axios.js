import axios from "axios";
import { toQueryString } from "./common.util";
import { setAccessToken } from "../../components/auth/auth.slice";
import { setIsExpired } from "../../components/auth/login.slice";
import { HOST_API } from "../../config";
import { store } from "../redux/store";
// import { PATH_AUTH } from "../";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
  paramsSerializer: (param) => toQueryString(param),
});

const axiosInstance2 = axios.create({
  baseURL: HOST_API,
});

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;
    const refreshToken = store.getState()?.authLogin.refreshToken;
    if (response?.status === 4001) {
      axiosInstance2
        .post("/refresh-token", { refreshToken })
        .then((res) => {
          store.dispatch(setAccessToken("Bearer " + res?.data?.accessToken));
        })
        .catch(() => {
          store.dispatch(setIsExpired(true));
          window.location.href = PATH_AUTH.login;
        });
    }
    return Promise.reject(error);
  }
);

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState()?.authLogin.accessToken;
  const userId = store.getState()?.authLogin.userId;

  if (token) {
    config.headers = {
      ...config.headers,
      authorization: token,
      "x-user-code": userId,
    };
  }

  return config;
});

export default axiosInstance;
