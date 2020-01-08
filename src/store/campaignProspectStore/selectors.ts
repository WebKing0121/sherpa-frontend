export const getCampaignProspects = (campaignId: number) => (state: any) => {
  const { campaignProspects = {} } = state.campaignProspectStore;
  const campaignProspectsList = campaignProspects[campaignId] || [];
  let sortedCampaignProspects = [...campaignProspectsList]

  // sort by date
  sortedCampaignProspects.sort((elem1: any, elem2: any) => {
    const elem1Date = new Date(elem1.lastUpdated);
    const elem2Date = new Date(elem2.lastUpdated);

    if (elem1Date < elem2Date) return 1;
    if (elem1Date > elem2Date) return -1;
    return 0
  });
  return sortedCampaignProspects || [];
};

export const nextPageUrl = (state: any) => state.campaignProspectStore.next;
