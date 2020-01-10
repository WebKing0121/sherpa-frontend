import { campaignProspectList, campaignProspectListNextPage } from './api';
import {
  fetchCampaignProspects,
  fetchCampaignProspectsFailure,
  fetchCampaignProspectsSuccess,
  fetchMoreCampaignProspects
} from './actions';

export const campaignProspectSearch = (campaignId: number, options: any) => (
  dispatch: any,
  getState: any
) => {
  const { force = false, page = null, filter, concatResults = false } = options;

  let apiParams = '';
  const {
    campaignProspectStore: { campaignProspects = {} }
  } = getState();

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
        dispatch(
          fetchCampaignProspectsSuccess({
            ...data,
            concatResults,
            results: { [campaignId]: data.results }
          })
        );
      })
      .catch(error => {
        console.log('UERRROR', error);
        dispatch(fetchCampaignProspectsFailure(true));
      });
  }
};

export const campaignProspectsNextPage = (campaignId: number) => (dispatch: any, getState: any) => {
  const {
    campaignProspectStore: { next = null, isLoadingMore, campaignProspects }
  } = getState();
  const existingCampaignProspects = campaignProspects[campaignId];

  if (next && !isLoadingMore) {
    dispatch(fetchMoreCampaignProspects(true));
    return campaignProspectListNextPage(next)
      .then(({ data }) => {
        dispatch(
          fetchCampaignProspectsSuccess({
            ...data,
            concatResults: true,
            results: {
              [campaignId]: [...existingCampaignProspects, ...data.results]
            }
          })
        );
      })
      .catch(error => console.log('ERROR', error.response));
  }
};
