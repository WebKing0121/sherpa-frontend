import AxiosInstance from '../../axiosConfig';
import {
  SET_PROSPECTS_SEARCH_STATUS,
  SET_SEARCH_PROSPECTS_ERROR,
  SET_SEARCHED_PROSPECTS,
  SET_MORE_PROSPECTS,
  RESET_PROSPECT_DATA
} from './actionTypes';
import { Fetching } from '../../variables';

export const setProspectSearchStatus = status => ({
  type: SET_PROSPECTS_SEARCH_STATUS,
  status
});
export const setProspectSearchError = error => ({
  type: SET_SEARCH_PROSPECTS_ERROR,
  error
});
export const setProspectSearchResults = data => ({
  type: SET_SEARCHED_PROSPECTS,
  data
});

export const setMoreProspects = data => ({
  type: SET_MORE_PROSPECTS,
  data
});

export const resetProspectData = () => ({
  type: RESET_PROSPECT_DATA
});

const doSearchProspect = url => {
  return AxiosInstance.get(url)
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      console.log('Error fetching prospects', error.response);
      return error.response;
    });
};

export const searchProspects = term => (dispatch, _) => {
  const url = `/prospects/?search=${term}&page_size=20`;

  dispatch(resetProspectData());
  dispatch(setProspectSearchStatus(Fetching));

  return doSearchProspect(url)
    .then(data => {
      dispatch(setProspectSearchResults(data));
      return data;
    })
    .catch(error => {
      console.log('ERROR', error);
    });
};

export const searchProspectNextPage = () => (dispatch, getState) => {
  let {
    prospects: { next = null, status = null }
  } = getState();

  if (next && status !== Fetching) {
    dispatch(setProspectSearchStatus(Fetching));
    return doSearchProspect(next).then(data => {
      dispatch(setMoreProspects(data));
    });
  }

  return new Promise((resolve, __) => resolve({}));
};
