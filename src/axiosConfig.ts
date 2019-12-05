import axios from 'axios';
import ReduxStore from './store/store';
import { logout } from './store/Auth/actions';
import { history } from './history';
import { setAuthToken } from './store/Auth/utils';


const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`
})

// adds interceptor for 401's
const okResponseInterceptor = (response: any) => response;

const errorResponseInterceptor = (error: any) => {
  // Redirect to login screen if we get `Unauthorized`
  if (error.response.status === 401) {
    ReduxStore.dispatch(logout());
    history.push("/login");

    // ReduxStore.dispatch(refreshToken())
    //   .then((token) => {
    //     //tokens refreshed - go ahead and retry the API call again
    //     setAuthToken({ access: token });
    //     return axiosInstance.request(error.config)
    //   });
  }
  return Promise.reject(error)
}

// handle case where we get =401= unauthorized
axiosInstance.interceptors.response.use(
  okResponseInterceptor,
  errorResponseInterceptor
);

export default axiosInstance;
