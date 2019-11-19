const initialState = {
  is_authenticated: false,
  token: '',
}

export default function authReducer(state = initialState, action) {
  const { type, token = '', is_authenticated = false } = action;
  switch (type) {
    case 'SET_AUTH_STATE':
      return {
        ...state,
        token: token,
        is_authenticated: is_authenticated
      };
    case 'SET_UNAUTH_STATE':
      return {
        ...state,
        token: '',
        is_authenticated: false
      };
    default:
      return state;
  }
}
