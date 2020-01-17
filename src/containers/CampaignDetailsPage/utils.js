import React from 'react';
import MainInfo from './MessagesTab/MainInfo';
import SubInfo from './MessagesTab/SubInfo';
import Title from './MessagesTab/Title';
import StatusWrapper from './MessagesTab/StatusWrapper';
import { IListItem } from '../../components/List/utils';
import store from '../../store/store';
import { patchProspect } from '../../store/prospectStore/api';
import { updateCampaignProspectSuccess } from '../../store/campaignProspectStore/actions';
import { prospectUpdate } from '../../store/prospectStore/thunks';
import { ProspectActions } from '../../helpers/variables';
import { getNewVerifiedStatus } from '../ProspectDetailsPage/DetailsTab/StatusSection';

/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */

export const prospectToItemList = campaignProspect => {
  const {
    prospect: { id, name, leadStageTitle = 'Follow-Up', displayMessage },
    hasUnreadSms
  } = campaignProspect;

  const prospectUpdateHasUnreadSms = () => {
    patchProspect(id, { hasUnreadSms: false }).then(({ data }) => {
      let newCampaignProspect = {
        ...campaignProspect,
        prospect: { ...campaignProspect.prospect, hasUnreadSms: false }
      };
      store.dispatch(updateCampaignProspectSuccess(newCampaignProspect));
    });
  };

  const prospectOnClickStatus = (attr, payload) => () => {
    return prospectUpdate(id, payload, store.dispatch, true).then(data => {
      let newCampaignProspect = {
        ...campaignProspect,
        prospect: { ...campaignProspect.prospect, ...data }
      };
      store.dispatch(updateCampaignProspectSuccess(newCampaignProspect));
    });
  };

  const actions = ProspectActions.map(action => {
    const status = campaignProspect.prospect[action.attr];
    let payload = { [action.attr]: !status };
    // special case for ownerVerifiedStatus
    if (action.attr === 'ownerVerifiedStatus') {
      payload[action.attr] = getNewVerifiedStatus(status);
    }

    return {
      ...action,
      status,
      link: prospectOnClickStatus(action.attr, payload)
    };
  });

  // NOTE(Diego): Make sure we normalize displayMessage so we don't
  // handle null logic
  const { message = '', dt = '' } = displayMessage || {};

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
      />
    ),
    actions: actions
  };
};

export const prospectsToItemList = prospects => prospects.map(prospectToItemList);
