import AxiosInstance from '../../axiosConfig';
import {
  SET_FETCH_CAMPAIGNS,
  SET_FETCH_CAMPAIGNS_ERROR,
  RESET_CAMPAIGNS_DATA,
  FETCH_CAMPAIGNS,
  ARCHIVE_CAMPAIGN,
  UPDATE_SMS_TEMPLATE
} from './actionTypes';
import { Fetching } from '../../helpers/variables';
import { decrementMarketCampaignCount } from '../Markets/actions';
import { arrayToMapIndex } from '../utils';
import { captureSort } from './utils';
import { fetchCampaignsBatchProspects } from '../CampaignsBatchProspectsStore/actions';

/*************************************************************************************************/

export const setFetchedCampaignStatus = status => ({
  type: FETCH_CAMPAIGNS,
  status
});

export const setFetchedCampaigns = data => ({
  type: SET_FETCH_CAMPAIGNS,
  data
});

export const setFetchedCampaignsError = error => ({
  type: SET_FETCH_CAMPAIGNS_ERROR,
  error
});

export const resetCampaignsData = () => ({
  type: RESET_CAMPAIGNS_DATA
});

export const setArchiveCampaign = data => ({
  type: ARCHIVE_CAMPAIGN,
  data
});

export const setUpdatedSmsTemplateCampaign = data => ({
  type: UPDATE_SMS_TEMPLATE,
  data
});

/*************************************************************************************************/

export const fetchCampaigns = id => (dispatch, _) => {
  dispatch(setFetchedCampaignStatus(Fetching));
  AxiosInstance.get('/campaigns/', { params: { market: id, ordering: 'newest', is_archived: false } })
    .then(({ data }) => {
      const { results } = data;

      const campaignMap = arrayToMapIndex('id', results);

      dispatch(setFetchedCampaigns({ campaigns: campaignMap, marketId: parseInt(id) }));
    })
    .catch(error => {
      console.log('error campaigns', error.response);
      dispatch(setFetchedCampaignsError('Error when fetching campaigns'));
    });
};

export const fetchSortedCampaigns = (sortBy, marketId) => (dispatch, _) => {
  dispatch(setFetchedCampaignStatus(Fetching));
  AxiosInstance.get('/campaigns/', {
    params: { market: marketId, ordering: sortBy, is_archived: false }
  })
    .then(({ data }) => {
      const { results } = data;

      const payload = {
        sortOrder: captureSort(results),
        campaigns: arrayToMapIndex('id', results),
        marketId
      };

      dispatch(setFetchedCampaigns(payload));
    })
    .catch(error => {
      console.log('Error fetching sorted campaigns', error.response);
      dispatch(setFetchedCampaignsError('Error when fetching sorted campaigns'));
    });
};

export const fetchFilteredData = (ownerId, marketId) => (dispatch, _) => {
  AxiosInstance.get('/campaigns/', { params: { owner: ownerId, market: marketId, is_archived: false } })
    .then(({ data }) => {
      const { results } = data;

      const campaignMap = arrayToMapIndex('id', results);

      dispatch(setFetchedCampaigns({ campaigns: campaignMap }));
    })
    .catch(error => {
      console.log('Error fetching filtered data by owner: ', error);
    });
};

export const fetchSingleCampaign = id => (dispatch, _) => {
  AxiosInstance.get(`/campaigns/${id}/`)
    .then(({ data }) => {
      const campaignMap = { [data.id]: data };
      dispatch(setFetchedCampaigns({ campaigns: campaignMap, marketId: data.market }));
    })
    .catch(error => {
      console.log('Error fetching the campaign: ', error);
    });
};

/*************************************************************************************************/

export const archiveCampaign = data => (dispatch, _) => {
  const { id, name, company, market, createdBy, priorityCount } = data;

  const body = {
    name,
    company,
    market,
    createdBy,
    priorityCount,
    isArchived: true
  };

  AxiosInstance.put(`/campaigns/${id}/`, body)
    .then(({ data }) => {
      dispatch(setArchiveCampaign(data));
      dispatch(decrementMarketCampaignCount(market));
    })
    .catch(error => {
      console.log('Error archiving camapign: ', error);
    });
};

export const updateSmsTemplate = data => (dispatch, _) => {
  const { id } = data;
  // optimistically update
  dispatch(setUpdatedSmsTemplateCampaign(data));
  AxiosInstance.patch(`/campaigns/${id}/`, data)
    .then(({ data }) => {
      dispatch(fetchCampaignsBatchProspects(data.id));
    })
    .catch(error => {
      console.log('Error updating sms template on campaign', error);
    });
};
