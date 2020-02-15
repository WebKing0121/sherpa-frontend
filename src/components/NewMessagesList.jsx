import React, { useEffect, useState } from 'react';
import TabbedHeader from './TabbedHeader';
import CollapsablePane from './CollapsablePane';
import { prospectsToItemList } from '../containers/CampaignDetailsPage/utils';
import List from './List/List';
import { useSelector } from 'react-redux';
import { getCampaignProspectsUnread } from '../store/campaignProspectStore/selectors';
import { path } from '../store/campaignProspectStore/reducer';
import styled from 'styled-components';

const Status = styled.h5`
  color: ${props => (props.archived ? 'grey' : 'green')}
`;

const NewMessages = (props) => {
  const campaignProspectsUnread = useSelector(getCampaignProspectsUnread);
  const [toggles, setToggle] = useState([]);

  const unreadSmsList = campaignProspectsUnread.map(
    prospectsToItemList({
      prospectPath: [...path, "campaignProspectsUnread"]
    }));

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
    <>
      {
        unreadSmsList.map((list, key) => {
          const campaign = campaignProspectsUnread[key][0].campaign;
          return (
            <CollapsablePane
              key={key}
              toggle={toggle(key)}
              isOpen={toggles[key]}
              header={
                <div>
                  <p>{campaign.name}</p>
                  <Status archived={campaign.isArchived}>
                    {campaign.isArchived ? 'Archived' : 'Active'}
                  </Status>
                </div>
              }
            >
              <List items={list} />
            </CollapsablePane>
          );
        })
      }
    </>
  );
}

export default NewMessages;
