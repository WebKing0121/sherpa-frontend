export const getCampaignProspects = (campaignId: number) => (state: any) => {
  const { campaignProspects = {} } = state.campaignProspectStore;
  return campaignProspects[campaignId] || [];
};

export const nextPageUrl = (state: any) => state.campaignProspectStore.next;
