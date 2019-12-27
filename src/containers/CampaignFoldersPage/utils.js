import React from 'react';
import SubInfo from './SubInfo';
import { StyledIcon } from '../../components/List/IconHolster';
import { IListItem } from '../../components/List/utils';

/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */

export const campaignFolderToItemList = ({ id, name, campaignCount }) => {
  return {
    ...IListItem,
    name,
    subInfo: <SubInfo data={{ campaignCount }} />,
    readable: true,
    isRead: true,
    link: { pathname: `/folder/${id}/campaigns` },
    icon: <StyledIcon margin="mb-1" name={'folder'} />
  };
}

export const campaignFoldersToItemList = (campaigns) => campaigns.map(campaignFolderToItemList);
