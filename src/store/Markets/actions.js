import AxiosInstance from '../../axiosConfig';
import {
  FETCH_MARKETS,
  SET_FETCH_MARKETS,
  SET_FETCH_MARKETS_ERROR,
  DECREMENT_MARKET_CAMPAIGN_COUNT
} from './actionTypes';
import { createMarketsFolders } from './transformers';
import { history } from '../../history';
import { saveToLocalStorage } from './utils';
import { Fetching } from '../../variables';

export const setFetchMarketsStatus = status => ({
  type: FETCH_MARKETS,
  status
});

export const setFetchedMarkets = campaignFolders => ({
  type: SET_FETCH_MARKETS,
  campaignFolders
});

export const setFetchedMarketsError = error => ({
  type: SET_FETCH_MARKETS_ERROR,
  error
});

export const decrementMarketCampaignCount = market => ({
  type: DECREMENT_MARKET_CAMPAIGN_COUNT,
  market
});

export const fetchMarkets = () => (dispatch, _) => {
  // NOTE: Needs to hit the Folder-endpoint in the future
  // For now we will render 1 folder called ALL that will contain all campaigns
  const handleError = (error, message) => {
    console.log('error markets', error.response);
    dispatch(setFetchedMarketsError(message));
  };

  dispatch(setFetchMarketsStatus(Fetching));

  AxiosInstance.get('/markets/')
    .then(({ data }) => {
      const { results } = data;

      const marketFolders = createMarketsFolders(results);

      if (marketFolders.length > 1 || marketFolders.length === 0) {
        dispatch(setFetchedMarkets(marketFolders));
        saveToLocalStorage('folderView', JSON.stringify(marketFolders));
      } else {
        const { id } = marketFolders[0];
        history.push(`/markets/${id}/campaigns`);
      }
    })
    .catch(error => {
      handleError(error, 'Error when fetching markets');
    });
};
