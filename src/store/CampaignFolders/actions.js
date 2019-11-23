import AxiosInstance from '../../axiosConfig';
import { SET_FETCH_CAMPAIGN_FOLDERS, SET_FETCH_CAMPAIGN_FOLDERS_ERROR } from './actionTypes';
import { createAllFolder } from './transformers';

export const setFetchedCampaignFolders = (campaignFolders) => ({
  type: SET_FETCH_CAMPAIGN_FOLDERS,
  campaignFolders
});

export const setFetchedCampaignFoldersError = (error) => ({
  type: SET_FETCH_CAMPAIGN_FOLDERS_ERROR,
  error
});

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

      dispatch(setFetchedCampaignFolders(createAllFolder(mockData)))
    })
    .catch((error) => {
      console.log('error campaigns', error.response);
      dispatch(setFetchedCampaignFoldersError("Error when fetching campaigns"))
    });
}
