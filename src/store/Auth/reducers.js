const initialState = {
  is_authenticated: false,
  token: '',
  refreshToken: '',
  error: ''
}

export default function authReducer(state = initialState, action) {
  const { type, access, refresh } = action;
  switch (type) {
    case 'SET_AUTH_STATE':
      return {
        ...state,
        token: access,
        refreshToken: refresh,
        is_authenticated: true,
        error: ''
      };
    case 'SET_UNAUTH_STATE':
      return {
        ...state,
        token: '',
        refreshToken: '',
        is_authenticated: false,
        error: ''
      };
    case 'SET_AUTH_ERROR':
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}
