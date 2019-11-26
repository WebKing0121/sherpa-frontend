interface AuthState {
    is_authenticated: boolean;
    token: string;
    refreshToken: string;
    error: string;
}

interface AuthAction {
    type: string;
    access: string;
    refresh: string;
    error: string;
}

export const initialState: AuthState = {
  is_authenticated: false,
  token: '',
  refreshToken: '',
  error: ''
}

export default function authReducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case 'SET_AUTH_STATE':
      return {
        ...state,
        token: action.access,
        refreshToken: action.refresh,
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
