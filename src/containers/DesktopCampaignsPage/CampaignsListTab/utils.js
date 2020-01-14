import React from 'react';
import DesktopCallouts from './DesktopCallouts';
import DesktopKebab from './DesktopKebab';
import { IListItem } from '../../../components/List/utils';
import { archiveCampaign } from '../../../store/Campaigns/actions';
/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */
export const campaignToItemList = campaign => {
  const { id, name, priorityCount, totalLeads, hasUnreadSMS, owner, createdDate, health, market, percentCompleteUnsent } = campaign;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getFormattedDateTime = (d) => {
    const date = new Date(d);
    const mon = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return mon + " " + day + ", " + year;
  };

  const date = getFormattedDateTime(createdDate);

  return {
    ...IListItem,
    id,
    name,
    subInfo: "By " + owner + " " + date,
    readable: true,
    isRead: false,
    desktopCallouts: <DesktopCallouts/>,
    desktopKebab: <DesktopKebab idx={id}/>,
    actions: [
      {
        name: 'Export',
        link: archiveCampaign(campaign),
      },
      {
        name: 'Rename',
        link: archiveCampaign(campaign),
      },
      {
        name: 'Archive',
        link: archiveCampaign(campaign),
      }
    ]
  };
};

export const campaignsToItemList = campaigns => campaigns.map(campaignToItemList);
