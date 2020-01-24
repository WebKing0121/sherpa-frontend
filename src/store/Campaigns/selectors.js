export const campaignsList = (state) => {
  const { campaigns: { campaigns, sortOrder } } = state;

  const campaignData = sortOrder.map((item) => {
    return campaigns[item];
  });

  return campaignData;
};

export const campaignsError = (state) => state.campaigns.error;
export const campaignsCount = (state) => state.campaigns.count;
export const campaignsStatus = (state) => state.campaigns.status;

export const activeMarket = (state) => state.campaigns.activeMarket;

export const getCampaign = (id) => (state) => state.campaigns.campaigns[id] || {};
