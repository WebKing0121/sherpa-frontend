import { profilesToAgents } from './transformers';

export const activeProspectSelector = (state: any) => state.uiStore.prospectDetailsView.activeProspect;

export const activeCampaignSelector = (state: any) => state.uiStore.prospectDetailsView.activeCampaign;

export const actionBtnStatusSelector = (state: any) => {
  const { actionButtons: {
    ownerVerifiedStatus,
    doNotCall,
    isPriority,
    isQualifiedLead
  } } = state.uiStore.prospectDetailsView

  return {
    ownerVerifiedStatus,
    doNotCall,
    isPriority,
    isQualifiedLead
  };
};

export const agentSelector = (state: any) => {
  let {
    auth: {
      userData: {
        company: { profiles }
      }
    }
  } = state;

  return profilesToAgents(profiles);
}
