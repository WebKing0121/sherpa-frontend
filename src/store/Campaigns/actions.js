import AxiosInstance from '../../axiosConfig';
import {
  SET_FETCH_CAMPAIGNS,
  SET_FETCH_CAMPAIGNS_ERROR,
  RESET_CAMPAIGNS_DATA,
  FETCH_CAMPAIGNS
} from './actionTypes';
import { Fetching } from '../../variables';
import { unArchivedData } from './transformers';

export const setFetchedCampaignStatus = status => ({
  type: FETCH_CAMPAIGNS,
  status
});

export const setFetchedCampaigns = campaigns => ({
  type: SET_FETCH_CAMPAIGNS,
  campaigns
});

export const setFetchedCampaignsError = error => ({
  type: SET_FETCH_CAMPAIGNS_ERROR,
  error
});

export const resetCampaignsData = () => ({
  type: RESET_CAMPAIGNS_DATA
});

export const fetchCampaigns = id => (dispatch, _) => {
  dispatch(setFetchedCampaignStatus(Fetching));

  AxiosInstance.get('/campaigns/', { params: { market: id } })
    .then(({ data }) => {
      const { results } = data;

      dispatch(setFetchedCampaigns(unArchivedData(results)));
    })
    .catch(error => {
      console.log('error campaigns', error.response);
      dispatch(setFetchedCampaignsError('Error when fetching campaigns'));
    });
};

export const fetchSortedCampaigns = (sortBy, marketId) => (dispatch, _) => {
  dispatch(setFetchedCampaignStatus(Fetching));

  AxiosInstance.get('/campaigns/', { params: { market: marketId, ordering: sortBy } })
    .then(({ data }) => {
      const { results } = data;

      dispatch(setFetchedCampaigns(unArchivedData(results)));
    })
    .catch(error => {
      console.log('Error fetching sorted campaigns', error.response);
      dispatch(setFetchedCampaignsError('Error when fetching sorted campaigns'));
    });
};
