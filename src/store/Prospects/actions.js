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

const doSearchProspect = (url) => {
  return AxiosInstance.get(url)
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      console.log('Error fetching prospects', error.response);
      return error.response
    });
}

export const searchProspects = (term) => (dispatch, _) => {
  const url = `/prospects/?search=${term}&page_size=20`;
  return doSearchProspect(url);
}

export const searchProspectNextPage = (next) => {
  if (next)
    return doSearchProspect(next);

  return new Promise((resolve, __) => resolve({}));
}

export const searchProspectPreviousPage = (previous) => {
  if (previous)
    return doSearchProspect(previous);
}
