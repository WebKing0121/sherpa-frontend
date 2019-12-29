import { profilesToAgents } from './transformers';

export const prospectDetailsData = (state) => state.prospectDetails.prospect;
export const prospectDetails = (state) => ({
  prospectId: state.prospectDetails.prospect.id,
  reminderDateLocal: state.prospectDetails.prospect.reminderDateLocal,
  sherpaPhoneNumber: state.prospectDetails.prospect.sherpaPhoneNumber,
  emailedToPodio: state.prospectDetails.prospect.emailedToPodio,
  pushedToZapier: state.prospectDetails.prospect.pushedToZapier,
  smsRelayMap: state.prospectDetails.smsRelayMap
});
export const prospectDetailUpdateStatus = (state) => state.prospectDetails.actionBtnStatus;
export const prospectDetailsStatus = (state) => state.prospectDetails.status;
export const prospectDetailsCampaigns = (state) => state.prospectDetails.prospectCampaigns;
export const prospectDetailsAgent = (state) => state.prospectDetails.prospect.smsRelayMap;


// details tab selectors
export const agentSelector = (state) => {
  let { auth: { userData: { company: { profiles } } } } = state;

  return profilesToAgents(profiles);
};
export const selectedAgent = (state) => state.prospectDetails.prospect.agent;
export const activeCampaignSelector = (state) => {
  const {
    prospectCampaigns = [],
    activeCampaign
  } = state.prospectDetails;
  let campaign = {};

  // return empty object if nothing found
  if (activeCampaign) {
    campaign = prospectCampaigns.find(
      (campaign_t) => campaign_t.id === activeCampaign
    ) || {};
  }

  return campaign;
}
// selectors for the action btns
export const prospectBtnStatus = (state) => state.prospectDetails.prospectDetailsTab.prospectStatus;
