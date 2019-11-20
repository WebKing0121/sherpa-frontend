import AxiosInstance from '../../axiosConfig';
import { setAuthToken, revokeAuthToken, saveToLocalStorage } from '../Auth/utils';

const setAuthenticated = ({ access = '', refresh = '' }) => ({
  type: 'SET_AUTH_STATE',
  access,
  refresh
});

const unsetAuthenticated = () => ({ type: 'SET_UNAUTH_STATE' });
const setAuthError = (error) => ({ type: 'SET_AUTH_ERROR', error })

export const authenticate = (credentials) => {
  return (dispatch, _) => {
    AxiosInstance
      .post('auth/jwt/create/', credentials)
      .then(({ data }) => {
        dispatch(setAuthenticated(data));
        setAuthToken(data);
        saveToLocalStorage('access', data.access);
        saveToLocalStorage('refresh', data.refresh);
      })
      .catch(({ response }) => {
        const { data: { detail } } = response;
        dispatch(setAuthError(detail));

      })
  };
}

export const logout = () => {
  unsetAuthenticated();
  revokeAuthToken('');
  saveToLocalStorage('access');
  saveToLocalStorage('refresh');
}
