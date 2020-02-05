import {
  SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_TAB,
  SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_SORT,
  SET_CAMPAIGN_DESKTOP_TAB_DATA
} from './actionTypes';

import {
  createAction
} from '../../../../../redux-helpers';

export const setCampaignPageActiveTab = createAction(SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_TAB);
export const setCampaignPageActiveSort = createAction(SET_CAMPAIGN_DESKTOP_PAGE_ACTIVE_SORT);
export const setCampaignPageTabData = createAction(SET_CAMPAIGN_DESKTOP_TAB_DATA);
