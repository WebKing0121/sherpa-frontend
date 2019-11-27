import { SEARCH_PROSPECTS, SET_SEARCH_PROSPECTS_ERROR, SET_SEARCHED_PROSPECTS } from './actionTypes';

const initialState = {
  count: 0,
  next: null,
  previous: null,
  prospects: [],
  status: ""
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PROSPECTS:
      return {
        ...state,
        status: action.status
      };
    case SET_SEARCH_PROSPECTS_ERROR:
      return {
        ...state,
        error: action.error
      }
    case SET_SEARCHED_PROSPECTS:
      return {
        ...state,
        prospects: action.data.results,
        count: action.data.count,
        next: action.data.next,
        previous: action.data.previous,
        status: ""
      }
    default:
      return state;
  }
}
