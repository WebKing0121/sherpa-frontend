import axiosInstance from '../../axiosConfig';

export const setAuthToken = ({ access, _ }) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
};

export const revokeAuthToken = (_) => {
  delete axiosInstance.defaults.headers.common['Authorization'];
}

// local-storage store keyval
export const saveToLocalStorage = (key, value) => {
  window.localStorage.setItem(key, value);
}

export const removeToLocalStorage = (key) => {
  window.localStorage.removeItem(key)
}

export const loadTokens = () => {
  const token = localStorage.getItem('access') || "";
  const refreshToken = localStorage.getItem('refresh') || "";
  const is_authenticated = token.length > 0;
  const error = "";

  return { auth: { token, refreshToken, is_authenticated, error } };
}
