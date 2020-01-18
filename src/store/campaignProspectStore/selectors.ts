export const getCampaignProspects = (campaignId: number) => (state: any) => {
  const { campaignProspects = {} } = state.campaignProspectStore;
  return campaignProspects[campaignId] || [];
};

export const isLoadingMore = (state: any) => state.campaignProspectStore.isLoadingMore;
export const isLoading = (state: any) => state.campaignProspectStore.isLoading;

export const getCampaignProspectsUnread = (state: any) => state.campaignProspectStore.campaignProspectsUnread;
