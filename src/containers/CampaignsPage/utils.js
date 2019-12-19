import React from 'react';
import SubInfo from './SubInfo';
import { IListItem } from '../../components/List/utils';
import { archiveCampaign } from '../../store/Campaigns/actions';

/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */
export const campaignToItemList = (campaign) => {
  const { id, name, priorityCount, totalLeads, hasUnreadSMS } = campaign;
  return {
    ...IListItem,
    id,
    name,
    subInfo: <SubInfo data={{ priorityCount, totalLeads }} />,
    readable: true,
    isRead: !hasUnreadSMS,
    link: `/campaigns/${id}/details`,
    actions: [
      {
        icon: "archive",
        name: "Archive",
        link: archiveCampaign(campaign),
        background: "gray"
      },
    ]
  };
}

export const campaignsToItemList = (campaigns) => campaigns.map(campaignToItemList);
