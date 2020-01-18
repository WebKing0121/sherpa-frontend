import React, { useEffect, useState } from 'react';
import { groupByArray } from '../../store/utils';
import TabbedHeader from '../../components/TabbedHeader';
import CollapsablePane from '../../components/CollapsablePane';
import { prospectsToItemList } from '../CampaignDetailsPage/utils';
import List from '../../components/List/List';
import { useSelector } from 'react-redux';
import { getCampaignProspectsUnread } from '../../store/campaignProspectStore/selectors';
import { updateCampaignProspectsUnread } from '../../store/campaignProspectStore/actions';

const NewMessages = (props) => {
  const campaignProspectsUnread = useSelector(getCampaignProspectsUnread);
  const [toggles, setToggle] = useState([]);
  const groupedCampaignProspects = groupByArray(
    ['campaign', 'id'],
    campaignProspectsUnread
  );
  const unreadSmsList = groupedCampaignProspects.map(
    prospectsToItemList({
      updateCampaignProspectFn: updateCampaignProspectsUnread
    })
  );

  useEffect(() => {
    if (unreadSmsList.length !== toggles.length)
      setToggle(unreadSmsList.map(_ => true));
  }, [unreadSmsList, toggles]);

  const toggle = (idx) => () => {
    const value = !toggles[idx];
    const newV = [...toggles];
    newV[idx] = value;
    setToggle(newV);
  };

  return (
    <div className="pageContent">
      <TabbedHeader data={{}}>New Messages</TabbedHeader>
      {
        unreadSmsList.map((list, key) => (
          <CollapsablePane
            key={key}
            toggle={toggle(key)}
            isOpen={toggles[key]}
            header={groupedCampaignProspects[key][0].campaign.name}
          >
            <List items={list} />
          </CollapsablePane>
        ))
      }
    </div>
  );
}

export default NewMessages;
