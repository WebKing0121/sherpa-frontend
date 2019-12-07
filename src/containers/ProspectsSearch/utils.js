import React from 'react';
import MainInfo from './MainInfo';
import Indicator from './Indicator';
import { IListItem } from '../../components/List/utils';

/*
 * Helper functions to transform a prospect to an appropriate
 * interface for the =ItemList= component to render.
 */

export const prospectToItemList = (prospect) => {
  const {
    name, phoneDisplay,
    propertyAddress, propertyCity,
    propertyState, propertyZip,
    hasUnreadSms, leadStageTitle } = prospect;
  let addressData = { propertyAddress, propertyCity, propertyState, propertyZip };
  return {
    ...IListItem,
    name,
    subInfo: phoneDisplay,
    mainInfo: <MainInfo addressData={addressData} />,
    readable: true,
    isRead: !hasUnreadSms,
    link: `/prospectDetails`,
    indicator: <Indicator status={leadStageTitle} />,
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
