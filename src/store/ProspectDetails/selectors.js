export const prospectDetailsData = (state) => state.prospectDetails.prospect;
export const prospectDetailsId = (state) => state.prospectDetails.prospectId;
export const prospectDetailsStatus = (state) => state.prospectDetails.status;
export const prospectDetailsCampaigns = (state) => state.prospectDetails.prospectCampaigns;

// details tab selectors
export const leadStagesSelector = (state) => state.prospectDetails.prospectDetailsTab.leadStages;
export const agentSelector = (state) => state.prospectDetails.prospectDetailsTab.agents;
