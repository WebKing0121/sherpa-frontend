import AxiosInstance from '../../axiosConfig';
import {
  FETCH_OWNERS,
  SET_FETCH_OWNERS,
  SET_FETCH_OWNERS_ERROR
} from './actionTypes';
import { setFetchedCampaigns } from '../Campaigns/actions';
import { Fetching } from '../../variables';

export const setFetchedOwnersStatus = status => ({
  type: FETCH_OWNERS,
  status
});

export const setFetchedOwners = owners => ({
  type: SET_FETCH_OWNERS,
  owners
});

export const setFetchedOwnersError = error => ({
  type: SET_FETCH_OWNERS_ERROR,
  error
});

export const fetchOwners = id => (dispatch, _) => {
  dispatch(setFetchedOwnersStatus(Fetching));

  AxiosInstance.get(`/companies/${id}`)
    .then(({ data }) => {
      const { profiles } = data;
      dispatch(setFetchedOwners(profiles));
    })
    .catch(error => {
      console.log('Error owners', error);
      dispatch(setFetchedOwnersError('Error when fetching owners'));
    });
};

export const fetchFilteredData = (ownerId, marketId) => (dispatch, _) => {

  AxiosInstance.get('/campaigns/', { params: { owner: ownerId, market: marketId, is_archived: false } })
    .then(({ data }) => {
      const { results } = data;
      dispatch(setFetchedCampaigns({ campaigns: results }));
    })
    .catch(error => {
      console.log('Error fetching filtered data by owner: ', error);
    });
};
