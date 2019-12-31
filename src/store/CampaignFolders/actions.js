import AxiosInstance from '../../axiosConfig';
import {
  SET_FETCH_CAMPAIGN_FOLDERS,
  SET_FETCH_CAMPAIGN_FOLDERS_ERROR,
  FETCH_CAMPAIGN_FOLDERS,
  DECREMENT_MARKET_CAMPAIGN_COUNT
} from './actionTypes';
import { createMarketsFolders } from './transformers';
import { history } from '../../history';
import { saveToLocalStorage } from './utils';
import { Fetching } from '../../variables';

export const setFetchCampaignFoldersStatus = status => ({
  type: FETCH_CAMPAIGN_FOLDERS,
  status
});

export const setFetchedCampaignFolders = campaignFolders => ({
  type: SET_FETCH_CAMPAIGN_FOLDERS,
  campaignFolders
});

export const setFetchedCampaignFoldersError = error => ({
  type: SET_FETCH_CAMPAIGN_FOLDERS_ERROR,
  error
});

export const decrementMarketCampaignCount = (market) => ({
  type: DECREMENT_MARKET_CAMPAIGN_COUNT,
  market
})

export const fetchCampaignFolders = () => (dispatch, _) => {
  // NOTE: Needs to hit the Folder-endpoint in the future
  // For now we will render 1 folder called ALL that will contain all campaigns
  const handleError = (error, message) => {
    console.log('error markets', error.response);
    dispatch(setFetchedCampaignFoldersError(message));
  };

  dispatch(setFetchCampaignFoldersStatus(Fetching));

  AxiosInstance.get('/markets/')
    .then(({ data }) => {

      const { results } = data;

      const marketFolders = createMarketsFolders(results);

      if (marketFolders.length > 1 || marketFolders.length === 0) {
        dispatch(setFetchedCampaignFolders(marketFolders));
        saveToLocalStorage('folderView', JSON.stringify(marketFolders));
      } else {
        const { id } = marketFolders[0];
        history.push(`/folder/${id}/campaigns`);
      }
    })
    .catch(error => {
      handleError(error, 'Error when fetching markets');
    });
};
