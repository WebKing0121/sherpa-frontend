import { mapIndexToArray } from '../utils';

export const campaignsList = (state) => {
  const { campaigns: { campaigns } } = state;
  return mapIndexToArray(campaigns);
};

export const campaignsError = (state) => state.campaigns.error;
export const campaignsCount = (state) => state.campaigns.count;
export const campaignsStatus = (state) => state.campaigns.status;

export const activeMarket = (state) => state.campaigns.activeMarket;

export const getCampaign = (id) => (state) => state.campaigns.campaigns[id] || {};
