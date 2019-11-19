import AxiosInstance from '../../axiosConfig';

const setAuthenticated = (token) => ({
  type: 'SET_AUTH_STATE',
  token
});

const unsetAuthenticated = () => ({ type: 'SET_UNAUTH_STATE' });

export const authenticate = (credentials) => {
  return (dispatch, _) => {
    AxiosInstance
      .post('auth/jwt/create/', credentials)
      .then(response => {
        console.log('response', response)
        dispatch(setAuthenticated('onetwothree'))
      })
      .catch(error => {
        console.log('error', error);
        dispatch(unsetAuthenticated());
      })
  };
}
