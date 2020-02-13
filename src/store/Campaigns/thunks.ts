import {
  fetchCampaignNextPage,
  updateCampaignList,
  setFetchedCampaignStatus,
  setFetchedCampaigns,
  resetCampaignsData,
  setArchiveCampaign,
  setUpdatedSmsTemplateCampaign,
  setFetchCampaignsNextPage,
  setFetchCampaignsNextPageSuccess,
  setFetchedCampaignsError
} from './actions';

import AxiosInstance from '../../axiosConfig';
import { Fetching } from '../../helpers/variables';
import { decrementMarketCampaignCount } from '../Markets/actions';
import { arrayToMapIndex } from '../utils';
import { captureSort } from './utils';
import { fetchCampaignsBatchProspects } from '../CampaignsBatchProspectsStore/actions';
import { sortByOrder } from './selectors';
import * as api from './api';
import { createAction } from '../../redux-helpers';

interface IParams {
  market: number;
  ordering: string;
}

const formatCampaigns = (data: any, params?: IParams) => {
  const payload: any = {
    sortOrder: captureSort(data.results),
    campaigns: arrayToMapIndex('id', data.results),
    previous: data.previous,
    next: data.next,
  };
  if (params) {
    payload.sortBy = params.ordering;
    payload.marketId = params.market;
  }
  return payload;
};

export const fetchSortedCampaigns = (params: IParams) => (dispatch: any) => {
  dispatch(setFetchedCampaignStatus(Fetching));
  AxiosInstance.get('/campaigns/', {
    params
  }).then(({ data }) => {
    const payload = formatCampaigns(data, params);
    dispatch(setFetchedCampaigns(payload));
  }).catch(error => {
    console.log('Error fetching sorted campaigns', error.response);
    dispatch(setFetchedCampaignsError('Error when fetching sorted campaigns'));
  });
};

export const campaignsNextPage = () => (dispatch: any, getState: any) => {
  let {
    campaigns: { next = null, isLoadingMore = false }
  } = getState();
  if (next && !isLoadingMore) {
    dispatch(fetchCampaignNextPage(true));
    return api.listCampaignsNextPage(next).then(({ data }) => {
      const payload = formatCampaigns(data);
      dispatch(setFetchedCampaigns({ ...payload }));
      dispatch(fetchCampaignNextPage(false));
    });
  }
}


export const fetchFilteredData = (params: IParams, overrideData = true) => (dispatch: any) => {
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

export const fetchFilteredDataNextPage = (nextUrl: string) => (dispatch: any) => {
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

export const fetchSingleCampaign = (id: string) => (dispatch: any) => {
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

export const archiveCampaign = (data: any) => (dispatch: any) => {
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

export const updateSmsTemplate = (data: any) => (dispatch: any) => {
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
