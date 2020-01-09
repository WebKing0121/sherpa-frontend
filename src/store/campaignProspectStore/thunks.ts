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
  (campaignId: number, options: any) => (dispatch: any, getState: any) => {
    const { force = false, page = null, filter, concatResults = false } = options;

    let apiParams = '';
    const { campaignProspectStore: { campaignProspects = {} } } = getState();

    // Fetch if 'forced' or if don't have anything
    if (!campaignProspects[campaignId] || campaignProspects[campaignId].length === 0 || force) {

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
          dispatch(fetchCampaignProspectsSuccess({
            ...data,
            concatResults,
            results: { [campaignId]: data.results }
          }))
        })
        .catch(error => {
          console.log("UERRROR", error);
          dispatch(fetchCampaignProspectsFailure(true))
        });
    }

  };
