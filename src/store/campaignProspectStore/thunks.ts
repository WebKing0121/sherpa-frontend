import {
  campaignProspectList
} from './api';
import {
  fetchCampaignProspects,
  fetchCampaignProspectsFailure,
  fetchCampaignProspectsSuccess,

  updateCampaignProspects
} from './actions';
import { IFilter } from './interfaces';
import { arrayToMapIndex } from '../../store/utils';

export const campaignProspectSearch =
  (campaignId: number, filter?: IFilter, page?: string) => (dispatch: any) => {
    let apiParams = '';

    // construct filter
    if (filter) {
      apiParams = `&${filter.name}=${filter.value}`;
    }

    // check if page is set
    if (page) {
      apiParams += `&page${page}`;
    }

    dispatch(fetchCampaignProspects(true));
    return campaignProspectList(campaignId, apiParams)
      .then(({ data }) => {
        dispatch(fetchCampaignProspectsSuccess({ ...data, results: { [campaignId]: data.results } }))
      })
      .catch(error => {
        console.log("UERRROR", error);
        dispatch(fetchCampaignProspectsFailure(true))
      });
  };
