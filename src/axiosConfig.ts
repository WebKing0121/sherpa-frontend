import axios from "axios";
import ReduxStore from "./store/store";
import { logout, setAuthenticated } from "./store/Auth/actions";
import { setAuthToken, CreateToken, saveToLocalStorage, loadTokens } from "./store/Auth/utils";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`
});

// updates access token if is an error 401 AND refresh token is valid
const handleNewAccessToken = (error: any, { access, refresh }: CreateToken) => {
  const originalRequest = error.config;
  originalRequest.headers["Authorization"] = `Bearer ${access}`;
  saveToLocalStorage("access", access);
  setAuthToken({ access });
  ReduxStore.dispatch(setAuthenticated({ access, refresh }));
  return originalRequest;
};

// adds interceptor for 401's
const okResponseInterceptor = (response: any) => response;

const errorResponseInterceptor = (error: any) => {
  // Redirect to login screen if we get `Unauthorized`
  if (error.response.status === 401) {
    // get new access token
    const { auth } = loadTokens();
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}auth/jwt/refresh/`, {
        refresh: auth.refreshToken
      })
      .then(({ data }) => {
        const updatedTokens = {
          access: data.access,
          refresh: auth.refreshToken
        };
        return axios.request(handleNewAccessToken(error, updatedTokens));
      })
      .catch(error => {
        console.log("Token cannot be refreshed ", error);
        ReduxStore.dispatch(logout());
      });
  }
  return Promise.reject(error);
};

// handle case where we get =401= unauthorized
axiosInstance.interceptors.response.use(okResponseInterceptor, errorResponseInterceptor);

export default axiosInstance;
