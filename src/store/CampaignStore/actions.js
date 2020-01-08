import axiosInstance, { delayedRequest } from '../../axiosConfig';
import {
  FETCH_CAMPAIGN,
  SET_FETCH_CAMPAIGN,
  SET_FETCH_CAMPAIGN_ERROR,
} from './actionTypes';
import { Fetching, fastSpinner } from '../../variables';

export const setFetchedSingleCampaignStatus = status => ({
  type: FETCH_CAMPAIGN,
  status
});

export const setFetchedSingleCampaign = data => ({
  type: SET_FETCH_CAMPAIGN,
  data
});

export const setFetchedCampaignError = error => ({
  type: SET_FETCH_CAMPAIGN_ERROR,
  error
});

export const fetchSingleCampaign = id => (dispatch, _) => {
  dispatch(setFetchedSingleCampaignStatus(Fetching));

  delayedRequest(axiosInstance.get(`/campaigns/${id}`), fastSpinner)
  .then(({ data }) => {
    dispatch(setFetchedSingleCampaign(data));
  })
  .catch(error => {
    console.log('error campaigns', error.response);
    dispatch(setFetchedCampaignError('Error when fetching campaign'));
  });
};
