import { createAction } from '../../redux-helpers';
import {
  FETCH_CAMPAIGN_PROSPECTS,
  FETCH_CAMPAIGN_PROSPECTS_SUCCESS,
  FETCH_CAMPAIGN_PROSPECTS_FAILURE,
  UPDATE_CAMPAIGN_PROSPECT_LIST
} from './actionTypes';

// fetching batch
export const fetchCampaignProspects = createAction(FETCH_CAMPAIGN_PROSPECTS);
export const fetchCampaignProspectsSuccess = createAction(FETCH_CAMPAIGN_PROSPECTS_SUCCESS);
export const fetchCampaignProspectsFailure = createAction(FETCH_CAMPAIGN_PROSPECTS_FAILURE);

export const updateCampaignProspects = createAction(UPDATE_CAMPAIGN_PROSPECT_LIST);
