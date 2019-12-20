import AxiosInstance from '../../axiosConfig';

import {
  setAuthToken,
  revokeAuthToken,
  saveToLocalStorage,
  removeFromLocalStorage
} from '../Auth/utils';

import { UserData } from './reducers';

export const setAuthenticated = ({ access = '', refresh = '' }) => ({
  type: 'SET_AUTH_STATE',
  access,
  refresh
});

export const unsetAuthenticated = () => ({ type: 'SET_UNAUTH_STATE' });
export const setAuthError = (error: string) => ({ type: 'SET_AUTH_ERROR', error });
export const setUserInfo = (userData: UserData) => ({ type: 'SET_USER_DATA', userData });

export const fetchUserInfo = (dispatch: any) => {
  return AxiosInstance.get('/auth/users/me/')
    .then(({ data }) => {
      console.log(data);
      dispatch(setUserInfo(data));
      saveToLocalStorage('userData', JSON.stringify(data));
      console.log('fetch-user-success response', data);
    })
    .catch(({ response }) => {
      console.log('fetch-user-error response', response);
    });
};

export const updateAuth = (dispatch: any, data: any) => {
  dispatch(setAuthenticated(data));
  saveToLocalStorage('access', data.access);
  saveToLocalStorage('refresh', data.refresh);
};

export const authenticate = (credentials: any, continuation: any) => {
  return (dispatch: any, _: any) => {
    return AxiosInstance.post('auth/jwt/create/', credentials)
      .then(({ data }) => {
        setAuthToken(data);

        // fetch the user info, mainly the user-id
        fetchUserInfo(dispatch).then(() => {
          updateAuth(dispatch, data);
          continuation();
        });
      })
      .catch(({ response }) => {
        const {
          data: { detail }
        } = response;
        dispatch(setAuthError(detail));
      });
  };
};

export const logout = (): any => {
  return (dispatch: any, _: any) => {
    dispatch(unsetAuthenticated());
    revokeAuthToken('');
    removeFromLocalStorage('access');
    removeFromLocalStorage('refresh');
    removeFromLocalStorage('userData');
    dispatch({ type: 'RESET' });
  };
};
