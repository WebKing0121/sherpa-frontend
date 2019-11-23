// Temporary function that creates the ALL folder that's going to be
// removed once the folder-endpoint works properly
export const createAllFolder = (data) => {
  return [{
    id: 1,
    name: "ALL",
    company: 0,
    isActive: true,
    hasUnreadSMS: data.filter(campaign => campaign.hasUnreadSMS).length > 0,
    totalCampaigns: data.length
  }]
}
