import React from 'react';
import MainInfo from './MessagesTab/MainInfo';
import SubInfo from './MessagesTab/SubInfo';
import Title from './MessagesTab/Title';
import StatusWrapper from './MessagesTab/StatusWrapper';
import { IListItem } from '../../components/List/utils';
import store from '../../store/store';
import { patchProspect } from '../../store/prospectStore/api';
import { prospectUpdate } from '../../store/prospectStore/thunks';
import { ProspectActions } from '../../helpers/variables';
import { getNewVerifiedStatus } from '../ProspectDetailsPage/DetailsTab/StatusSection';
import { updateProspectSuccess } from '../../store/prospectStore/actions';
import { ProspectRecord } from '../../store/prospectStore/interfaces';
import {
  setProspectActiveTab
} from '../../store/uiStore/prospectDetailsPageView/actions';

/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */

export const prospectToItemList = opts => campaignProspect => {
  const {
    prospect: { id, name, leadStageTitle = 'Follow-Up', displayMessage },
    hasUnreadSms
  } = campaignProspect;

  // NOTE: currently un-used but will be used to dispatch the
  // =readSms= action that is currently unknown
  const prospectUpdateHasUnreadSms = () => {
    patchProspect(id, { hasUnreadSms: false }).then(({ data }) => {
      let newCampaignProspect = {
        ...campaignProspect,
        prospect: { ...campaignProspect.prospect, hasUnreadSms: false }
      };
      store.dispatch(opts.updateCampaignProspectFn(newCampaignProspect));
    });
  };

  // when we click on the item we want to navigate to the
  // prospect-details page Message Tab.
  // We need to dispatch an action to set the proper tab.
  const onClickItem = () => store.dispatch(setProspectActiveTab('2'));

  const prospectOnClickStatus = (attr, payload) => () => {
    return prospectUpdate(id, payload, store.dispatch).then(data => {
      let newCampaignProspect = {
        ...campaignProspect,
        prospect: { ...campaignProspect.prospect, ...data, campaigns: [campaignProspect.campaign] }
      };
      // update prospect-campaign-store
      store.dispatch(opts.updateCampaignProspectFn(newCampaignProspect));

      // // update prospect-store
      store.dispatch(updateProspectSuccess(ProspectRecord(newCampaignProspect.prospect, false)));
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
    statusWrapper: <StatusWrapper dt={dt} link={`/prospect/${id}/details`} onClick={onClickItem} />,
    actions: actions
  };
};

// uses a higher-order function for re-usability
export const prospectsToItemList = opts => prospects => prospects.map(prospectToItemList(opts));
