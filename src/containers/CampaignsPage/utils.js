import React from 'react';
import SubInfo from './SubInfo';
import { IListItem } from '../../components/List/utils';

/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */
export const campaignToItemList = ({ id, name, priorityCount, totalLeads, hasUnreadSMS }) => {
  return {
    ...IListItem,
    name,
    subInfo: <SubInfo data={{ priorityCount, totalLeads }} />,
    readable: true,
    isRead: !hasUnreadSMS,
    link: `/campaigns/${id}/details`,
    actions: [
      {
        icon: "archive",
        name: "Archive",
        link: "#",
        background: "gray"
      },
    ]
  };
}

export const campaignsToItemList = (campaigns) => campaigns.map(campaignToItemList);
