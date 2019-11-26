import React from 'react';
import SubInfo from './SubInfo';
import Icon from '../../components/Icon';

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

export const campaignFolderToItemList = ({ id, name, totalCampaigns, hasUnreadSMS }) => {
  return {
    ...IListItem,
    name,
    subInfo: <SubInfo data={{ totalCampaigns }} />,
    readable: true,
    isRead: !hasUnreadSMS,
    link: { pathname: `/folder/${id}/campaigns` },
    icon: <Icon name={'folder'} />
  };
}

export const campaignFoldersToItemList = (campaigns) => campaigns.map(campaignFolderToItemList);
