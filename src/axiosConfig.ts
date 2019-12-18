import axios, { AxiosResponse } from 'axios';
import ReduxStore from './store/store';
import { loadTokens, getNewAccessToken } from './store/Auth/utils';
import { addNewToast } from './store/Toasts/actions';
import { generalNetworkError } from './variables';

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({ baseURL });

// adds interceptor for 401's
const okResponseInterceptor = (response: any) => {
  return new Promise<AxiosResponse<any>>((resolve: any, _: any) => {
    setTimeout(() => resolve(response), 500)
  })
};

const errorResponseInterceptor = (error: any) => {
  const { status } = error.response;
  const {
    auth: { refreshToken }
  } = loadTokens();
  // updates access token if is an error 401 AND refresh token is valid
  if (status === 401 && refreshToken) {
    return getNewAccessToken(refreshToken, error);
  }
  // display error toast/alert
  if (status > 404) {
    ReduxStore.dispatch(addNewToast({ message: generalNetworkError, color: 'danger' }));
  }

  return Promise.reject(error);
};

// handle case where we get =401= unauthorized
axiosInstance.interceptors.response.use(okResponseInterceptor, errorResponseInterceptor);

export default axiosInstance;
