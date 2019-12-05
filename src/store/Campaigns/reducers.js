import { FETCH_CAMPAIGNS, SET_FETCH_CAMPAIGNS, SET_FETCH_CAMPAIGNS_ERROR } from './actionTypes';

// campaigns reducer
export const initialState = {
  campaigns: [],
  error: "",
  next: "",
  previous: "",
  count: 0,
  status: ""
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CAMPAIGNS:
      return {
        ...state,
        status: "loading"
      }
    case SET_FETCH_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.campaigns,
        status: 'success'
      }
    case SET_FETCH_CAMPAIGNS_ERROR:
      return {
        ...state,
        error: action.error,
        status: 'error'
      }
    default:
      return state
  }
}

// campaigns folder reducer
