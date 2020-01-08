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
  (campaignId: number, filter?: IFilter, page?: string) => (dispatch: any, getState: any) => {
    let apiParams = '';
    const { campaignProspectStore: { campaignProspects = {} } } = getState();

    // if we've got stuff here then don't refetch just display what we've got
    if (!campaignProspects[campaignId] || campaignProspects[campaignId].length === 0) {
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
    }

  };
