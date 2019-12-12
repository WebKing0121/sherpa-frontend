import AxiosInstance from '../../axiosConfig';
import { SET_FETCH_CAMPAIGNS, SET_FETCH_CAMPAIGNS_ERROR, RESET_CAMPAIGNS_DATA, FETCH_CAMPAIGNS } from './actionTypes';

export const setFetchedCampaignStatus = (status) => ({
  type: FETCH_CAMPAIGNS,
  status
});

export const setFetchedCampaigns = (campaigns) => ({
  type: SET_FETCH_CAMPAIGNS,
  campaigns
});

export const setFetchedCampaignsError = (error) => ({
  type: SET_FETCH_CAMPAIGNS_ERROR,
  error
});

export const resetCampaignsData = () => ({
  type: RESET_CAMPAIGNS_DATA
})

export const fetchCampaigns = (id) => (dispatch, _) => {

  dispatch(setFetchedCampaignStatus('Fetching'));

  AxiosInstance.get('/campaigns/', { params: { market: id } })
    .then(({ data }) => {
      const { results } = data;
      dispatch(setFetchedCampaigns(results));
    })
    .catch((error) => {
      console.log('error campaigns', error.response);
      dispatch(setFetchedCampaignsError("Error when fetching campaigns"))
    });
}
