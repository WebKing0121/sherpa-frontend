import AxiosInstance from '../../axiosConfig';
import { SET_FETCH_CAMPAIGNS, SET_FETCH_CAMPAIGNS_ERROR, RESET_CAMPAIGNS_DATA } from './actionTypes';

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

export const fetchCampaignFolders = () => (dispatch, _) => {
  // NOTE: Needs to hit the Folder-endpoint in the future
  // For now we will render 1 folder called ALL that will contain
  // all campaigns
  AxiosInstance.get('/campaigns/')
    .then(({ count, next, previous, results }) => {
      let mockData = [{
        "id": 0,
        "name": "Campaign 2019",
        "company": 1,
        "market": 2,
        "tags": [
          {
            "name": "HOT",
            "company": 1
          }
        ],
        "isDefault": true,
        "isArchived": false,
        "createdDate": "2019-11-21T22:29:02Z",
        "createdBy": 6,
        "totalProspects": 2,
        "responseRate": 0,
        "totalLeads": 0,
        "percentCompleteUnsent": "na",
        "health": "good",
        "priority": 1,
        "owner": 6,
        "hasUnreadSMS": true
      }];

      // TODO: Move transformation function into transformers

      dispatch(setFetchedCampaigns(mockData))
    })
    .catch((error) => {
      console.log('error campaigns', error.response);
      dispatch(setFetchedCampaignsError("Error when fetching campaigns"))
    });
}
