import React from 'react';
import Title from './Title';
import StatusWrapper from './StatusWrapper';
import { IListItem } from '../../../components/List/utils';
import DesktopKebab from '../DesktopKebab';
import store from '../../../store/store';
import { patchProspect } from '../../../store/prospectStore/api';
import { prospectUpdate } from '../../../store/prospectStore/thunks';
import { ProspectActions } from '../../../helpers/variables';
import { getNewVerifiedStatus } from '../../../components/StatusActionBtns';
import { updateProspectSuccess } from '../../../store/prospectStore/actions';
import { ProspectRecord } from '../../../store/prospectStore/interfaces';
import {
  setProspectActiveTab
} from '../../../store/uiStore/prospectDetailsPageView/actions';

/*
 * Helper functions to transform a campaign to an appropriate interface for the =ItemList=
 * component to render.
 */

export const prospectToItemList = opts => campaignProspect => {
  const {
    prospect: { id, name, leadStageTitle = 'Follow-Up', displayMessage },
    hasUnreadSms,
  } = campaignProspect;
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
    id,
    name: <Title name={name} isRead={!hasUnreadSms} />,
    subInfo: displayMessage.message,
    readable: true,
    isRead: !hasUnreadSms,
    statusWrapper: <StatusWrapper time="3:47pm" leadStage={leadStageTitle} actions={actions} dt={dt} />,
    desktopKebab: <DesktopKebab idx={"campaign" + id} actions={[]}/>
  };
};

// uses a higher-order function for re-usability
export const prospectsToItemList = opts => prospects => prospects.map(prospectToItemList(opts));
