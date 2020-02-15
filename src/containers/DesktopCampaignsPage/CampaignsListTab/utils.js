import React from 'react';
import DesktopCallouts from './DesktopCallouts';
import DesktopKebab from '../DesktopKebab';
import { IListItem } from '../../../components/List/utils';
import { archiveCampaign, exportCampaign } from '../../../store/Campaigns/thunks';
import store from '../../../store/store';
import { setUnArchiveCampaign } from '../../../store/Campaigns/actions';
import { addNewToast } from '../../../store/Toasts/actions';
/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */
const makeKebabActions = (campaign) => {
  // add logic for archive-unarchive
  const archiveOrUnArchive = campaign.isArchived ? 'Un-Archive' : 'Archive';

  const kebabActions = [
    { name: 'Export', onClick: () => store.dispatch(exportCampaign(campaign.id)) },
    { name: 'Rename', onClick: () => console.log("Ready to Rename") },
    {
      name: archiveOrUnArchive,
      onClick: () => {
        store.dispatch(
          archiveCampaign({
            ...campaign,
            market: campaign.market.id,
            createdBy: campaign.createdBy.id,
            isArchived: !campaign.isArchived
          })
        ).then(_ => {
          // NOTE: nasty way of doing it for now until we refactor the
          // `archiveCampaign` thunk.
          if (campaign.isArchived) {
            // only unarchive if the unarchived action was dispatched
            store.dispatch(setUnArchiveCampaign(campaign.id));
            store.dispatch(addNewToast({ message: 'Campaign Unarchived', color: 'success' }))
          } else {
            store.dispatch(addNewToast({ message: 'Campaign Archived', color: 'success' }))
          }
        });
      }
    }
  ];

  return kebabActions;
}

export const campaignToItemList = campaign => {
  const { id, name, priorityCount, totalLeads, createdBy, createdDate, health, market, percentCompleteUnsent } = campaign;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getFormattedDateTime = (d) => {
    const date = new Date(d);
    const mon = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return mon + " " + day + ", " + year;
  };

  const date = getFormattedDateTime(createdDate);
  const subInfoStr = `By ${createdBy.fullName} ${date}`;
  const kebabActions = makeKebabActions(campaign);

  return {
    ...IListItem,
    id,
    name,
    subInfo: subInfoStr,
    readable: true,
    isRead: false,
    desktopCallouts: (
      <DesktopCallouts
        data={{ priorityCount, totalLeads, health, percentCompleteUnsent, market }}
      />),
    desktopKebab: <DesktopKebab idx={id} actions={kebabActions} />,
    link: `/campaign/${id}/details`,
  };
};

export const campaignsToItemList = campaigns => campaigns.map(campaignToItemList);
