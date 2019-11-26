import React from 'react';
import MainInfo from './MainInfo';

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

export const prospectToItemList = (prospect) => {
  const {
    id, name, phoneDisplay,
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
    link: `/campaigns/${id}/details`,
    indicator: leadStageTitle
  };
}

export const prospectsToItemList = (prospects) => prospects.map(prospectToItemList);
