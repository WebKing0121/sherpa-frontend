import AxiosInstance from '../../axiosConfig';
import { SEARCH_PROSPECTS, SET_SEARCH_PROSPECTS_ERROR, SET_SEARCHED_PROSPECTS } from './actionTypes';

export const setProspectSearch = (status) => ({
  type: SEARCH_PROSPECTS,
  status
})
export const setProspectSearchError = (error) => ({
  type: SET_SEARCH_PROSPECTS_ERROR,
  error
})
export const setProspectSearchResults = (data) => ({
  type: SET_SEARCHED_PROSPECTS,
  data
});

const doSearchProspect = (url, dispatch) => {
  dispatch(setProspectSearch("Loading"));
  return AxiosInstance.get(url)
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      console.log('Error fetching prospects', error.response);
      dispatch(setProspectSearchError(error.response));
    })
}

export const searchProspects = (term) => (dispatch, _) => {
  const url = `/prospects/?search=${term}`;
  return doSearchProspect(url, dispatch);
}

export const searchProspectNextPage = (term) => (dispatch, getState) => {
  const { prospects: { next } } = getState();

  if (next)
    return doSearchProspect(next, dispatch);
}

export const searchProspectPreviousPage = (term) => (dispatch, getState) => {
  const { prospects: { previous } } = getState();
  if (previous)
    return doSearchProspect(previous, dispatch);
}
