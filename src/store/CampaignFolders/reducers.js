import { FETCH_CAMPAIGN_FOLDERS, SET_FETCH_CAMPAIGN_FOLDERS, SET_FETCH_CAMPAIGN_FOLDERS_ERROR } from './actionTypes';

// campaigns reducer
export const initialState = {
  folders: [],
  error: "",
  next: "",
  previous: "",
  count: 0,
  status: ""
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CAMPAIGN_FOLDERS:
      return {
        ...state,
        status: 'Fetching'
      }
    case SET_FETCH_CAMPAIGN_FOLDERS:
      return {
        ...state,
        folders: action.campaignFolders,
        status: 'Success'
      }
    case SET_FETCH_CAMPAIGN_FOLDERS_ERROR:
      return {
        ...state,
        error: action.error,
        status: 'error'
      }
    default:
      return state
  }
}
