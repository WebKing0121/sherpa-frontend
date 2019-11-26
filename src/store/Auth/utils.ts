import axiosInstance from '../../axiosConfig';

interface CreateToken {
    access: string;
    refresh?: string;
}

export const setAuthToken = ({ access }: CreateToken) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
};

export const revokeAuthToken = (_: any) => {
  delete axiosInstance.defaults.headers.common['Authorization'];
}

// local-storage store keyval
export const saveToLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
}

export const removeFromLocalStorage = (key: string) => {
  window.localStorage.removeItem(key)
}

export const loadTokens = () => {
  const token = localStorage.getItem('access') || "";
  const refreshToken = localStorage.getItem('refresh') || "";
  const is_authenticated = token.length > 0;
  const error = "";

  return { auth: { token, refreshToken, is_authenticated, error } };
}

export const setAuthTokenHeader = () => {
  const { auth } = loadTokens();

  if (auth.token)
      setAuthToken({ access: auth.token });
}
