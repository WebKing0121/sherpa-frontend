import React from 'react';
import MainInfo from './MessagesTab/MainInfo';
import Indicator from './MessagesTab/Indicator';
import SubInfo from './MessagesTab/SubInfo';
import Title from './MessagesTab/Title';
import StatusWrapper from './MessagesTab/StatusWrapper';
import { IListItem } from '../../components/List/utils';
import store from '../../store/store';
import { patchProspect } from '../../store/prospectStore/api';
import { updateCampaignProspectSuccess } from '../../store/campaignProspectStore/actions';

/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */

export const prospectToItemList = (campaignProspect) => {
  const {
    prospect: {
      id,
      name,
      leadStageTitle = "Follow-Up",
      displayMessage,
      hasUnreadSms
    }
  } = campaignProspect;

  const prospectUpdateHasUnreadSms = () => {
    patchProspect(id, { hasUnreadSms: false })
      .then(({ data }) => {
        let newCampaignProspect = {
          ...campaignProspect,
          prospect: { ...campaignProspect.prospect, hasUnreadSms: false }
        };
        store.dispatch(updateCampaignProspectSuccess(newCampaignProspect));
      })
  };


  // NOTE(Diego): Make sure we normalize displayMessage so we don't
  // handle null logic
  const {
    message = "",
    dt = "",
    fromProspect = false
  } = displayMessage;

  return {
    ...IListItem,
    name: <Title name={name} isRead={!hasUnreadSms} />,
    subInfo: <SubInfo status={leadStageTitle} />,
    mainInfo: <MainInfo message={message} />,
    readable: true,
    isRead: !hasUnreadSms,
    statusWrapper: (
      <StatusWrapper
        dt={dt}
        link={`/prospect/${id}/details`}
        onClick={!hasUnreadSms ? prospectUpdateHasUnreadSms : () => console.log('No Action')}
      />),
    actions: [
      {
        icon: "verified",
        name: "Verified",
        link: "#",
        background: "green"
      },
      {
        icon: "dnc",
        name: "DNC",
        link: "#",
        background: "white"
      },
      {
        icon: "priority",
        name: "Priority",
        link: "#",
        background: "orange"
      },
      {
        icon: "qualified",
        name: "Qualified",
        link: "#",
        background: "purple"
      }
    ]
  };
}

export const prospectsToItemList = (prospects) => prospects.map(prospectToItemList);
