import React from 'react';
import SubInfo from './SubInfo';

/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */

const IListItem = {
  name: null,
  subInfo: null,
  mainInfo: null,
  icon: null,
  link: null,
  indicator: null,
  isRead: false,
  readable: false
}

export const campaignToItemList = ({ id, name, priority, totalLeads, hasUnreadSMS }) => {
  return {
    ...IListItem,
    name,
    subInfo: <SubInfo data={{ priority, totalLeads }} />,
    readable: true,
    isRead: !hasUnreadSMS,
    link: `/campaigns/${id}/details`
  };
}

export const campaignsToItemList = (campaigns) => campaigns.map(campaignToItemList);
