export const prospectDetailsData = (state) => state.prospectDetails.prospect;
export const prospectDetailsId = (state) => ({
  prospectId: state.prospectDetails.prospect.id,
  reminderDateLocal: state.prospectDetails.prospect.reminderDateLocal
});
export const prospectDetailsStatus = (state) => state.prospectDetails.status;
export const prospectDetailsCampaigns = (state) => state.prospectDetails.prospectCampaigns;
export const prospectDetailsAgent = (state) => state.prospectDetails.prospect.smsRelayMap;

// details tab selectors
export const leadStagesSelector = (state) => state.prospectDetails.prospectDetailsTab.leadStages;
export const agentSelector = (state) => state.prospectDetails.prospectDetailsTab.agents;
