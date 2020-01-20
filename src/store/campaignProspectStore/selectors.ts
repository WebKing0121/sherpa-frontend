import { path } from './reducer';
import { createSelectorContext } from '../../redux-helpers';
import { updateIn } from '../../utils';

const createSelector = createSelectorContext(path);

export const isLoadingMore = createSelector('isLoadingMore');
export const isLoading = createSelector('isLoading');
export const getCampaignProspects =
  (campaignId: number, leadStages: Array<any>) => createSelector(
    'campaignProspects',
    (campaignProspectsMap: any) => {
      const campaignProspects = campaignProspectsMap[campaignId] || [];

      return campaignProspects.map((campaignProspect: any) => {
        const leadStage = leadStages.find(
          (leadStage: any) => leadStage.id === campaignProspect.prospect.leadStage
        );

        return {
          ...campaignProspect,
          prospect: {
            ...campaignProspect.prospect,
            leadStageTitle: leadStage.leadStageTitle
          }
        }
      })
    }
  );
export const getCampaignProspectsUnread = (leadStages: Array<any>) => createSelector(
  'campaignProspectsUnread',
  (campaignProspectsUnread: any) => {
    return campaignProspectsUnread.map((campaignProspect: any) => {
      const leadStage = leadStages.find(
        (leadStage: any) => leadStage.id === campaignProspect.prospect.leadStage
      );

      return {
        ...campaignProspect,
        prospect: {
          ...campaignProspect.prospect,
          leadStageTitle: leadStage.leadStageTitle
        }
      }
    })
  }
);
export const getCampaignProspectsUnreadCount = createSelector('campaignProspectsUnreadCount');
