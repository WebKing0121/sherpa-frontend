import AxiosInstance from '../../axiosConfig';
import {
  SET_FETCH_CAMPAIGNS,
  SET_FETCH_CAMPAIGNS_ERROR,
  RESET_CAMPAIGNS_DATA,
  FETCH_CAMPAIGNS,
  ARCHIVE_CAMPAIGN,
  UPDATE_SMS_TEMPLATE,
  SET_FETCH_CAMPAIGNS_NEXT_PAGE_SUCCESS,
  SET_FETCH_CAMPAIGNS_NEXT_PAGE,
  UPDATE_CAMPAIGN_LIST,
  FETCH_CAMPAIGN_NEXT_PAGE
} from './actionTypes';
import { Fetching } from '../../helpers/variables';
import { decrementMarketCampaignCount } from '../Markets/actions';
import { arrayToMapIndex } from '../utils';
import { captureSort } from './utils';
import { fetchCampaignsBatchProspects } from '../CampaignsBatchProspectsStore/actions';
import { sortByOrder } from './selectors';
import * as api from './api';
import { createAction } from '../../redux-helpers';

/*************************************************************************************************/

export const fetchCampaignNextPage = createAction(FETCH_CAMPAIGN_NEXT_PAGE);
export const updateCampaignList = createAction(UPDATE_CAMPAIGN_LIST, 'data');

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
export const setFetchCampaignsNextPage = (payload) => ({
  type: SET_FETCH_CAMPAIGNS_NEXT_PAGE,
  payload
});

export const setFetchCampaignsNextPageSuccess = (data) => ({
  type: SET_FETCH_CAMPAIGNS_NEXT_PAGE_SUCCESS,
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

export const fetchSortedCampaigns = (params = {}) => (dispatch, _) => {
  dispatch(setFetchedCampaignStatus(Fetching));
  AxiosInstance.get('/campaigns/', {
    params
  })
    .then(({ data }) => {
      const { results } = data;

      const payload = {
        sortOrder: captureSort(results),
        campaigns: arrayToMapIndex('id', results),
        marketId: params.market,
        sortBy: params.ordering
      };

      dispatch(setFetchedCampaigns(payload));
    })
    .catch(error => {
      console.log('Error fetching sorted campaigns', error.response);
      dispatch(setFetchedCampaignsError('Error when fetching sorted campaigns'));
    });
};

export const campaignsNextPage = () => (dispatch, getState) => {
  let {
    campaigns: { next = null, isLoadingMore = false }
  } = getState();

  if (next && !isLoadingMore) {
    dispatch(fetchCampaignNextPage(true));
    return api.listCampaignsNextPage(next).then(({ data }) => {
      dispatch(updateCampaignList({ ...data }));
      dispatch(fetchCampaignNextPage(false));
    });
  }
}


export const fetchFilteredData = (params, overrideData = true) => (dispatch, _) => {
  dispatch(setFetchedCampaignStatus(Fetching));
  return AxiosInstance.get('/campaigns/', { params })
    .then(({ data }) => {
      const { results } = data;

      const payload = {
        sortOrder: captureSort(results),
        campaigns: arrayToMapIndex('id', results),
        marketId: params.market,
        sortBy: params.ordering,
        overrideData
      };

      dispatch(setFetchedCampaigns(payload));

      return data;
    })
    .catch(error => {
      console.log('Error fetching filtered data by owner: ', error);
    });
};

export const fetchFilteredDataNextPage = (nextUrl) => (dispatch, _) => {
  // dispatch if fetching more
  setFetchCampaignsNextPage(true);
  return AxiosInstance.get(nextUrl)
    .then(({ data }) => {
      const { results } = data;

      const payload = {
        campaigns: arrayToMapIndex('id', results),
      };
      dispatch(setFetchCampaignsNextPageSuccess(payload));
      return data;
    })
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
