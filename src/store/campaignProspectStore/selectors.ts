export const getCampaignProspects = (campaignId: number) => (state: any) => {
  const { campaignProspects = {} } = state.campaignProspectStore;
  return campaignProspects[campaignId] || [];
};
