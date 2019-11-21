import AxiosInstance from '../../axiosConfig';
import {
  setAuthToken, revokeAuthToken,
  saveToLocalStorage, removeFromLocalStorage
} from '../Auth/utils';


export const setAuthenticated = ({ access = '', refresh = '' }) => ({
  type: 'SET_AUTH_STATE',
  access,
  refresh
});

export const unsetAuthenticated = () => ({ type: 'SET_UNAUTH_STATE' });
export const setAuthError = (error) => ({ type: 'SET_AUTH_ERROR', error })

export const authenticate = (credentials, continuation) => {
  return (dispatch, _) => {
    return AxiosInstance
      .post('auth/jwt/create/', credentials)
      .then(({ data }) => {
        dispatch(setAuthenticated(data));
        setAuthToken(data);
        saveToLocalStorage('access', data.access);
        saveToLocalStorage('refresh', data.refresh);
        continuation();
      })
      .catch(({ response }) => {
        const { data: { detail } } = response;
        dispatch(setAuthError(detail));
      })
  };
}

export const logout = () => {
  return (dispatch, _) => {
    dispatch(unsetAuthenticated());
    revokeAuthToken('');
    removeFromLocalStorage('access');
    removeFromLocalStorage('refresh');
  }
}
