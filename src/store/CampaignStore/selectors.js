export const campaign = (state) => state.campaignStore.campaign;
export const campaignError = (state) => state.campaignStore.error;
export const campaignStatus = (state) => state.campaignStore.status;

export const getCampaignDetails = (state) => {
  return state.campaignStore.campaign;
}
