import React, { useEffect, useState } from 'react';
import TabbedHeader from '../../components/TabbedHeader';
import CollapsablePane from '../../components/CollapsablePane';
import { prospectsToItemList } from '../CampaignDetailsPage/utils';
import List from '../../components/List/List';
import { useSelector } from 'react-redux';
import { getCampaignProspectsUnread } from '../../store/campaignProspectStore/selectors';
import { updateCampaignProspectsUnread } from '../../store/campaignProspectStore/actions';
import { path } from '../../store/campaignProspectStore/reducer';
import styled from 'styled-components';

const Status = styled.h5`
  color: ${props => (props.archived ? 'grey' : 'green')}
`;

const NewMessages = (props) => {
  const campaignProspectsUnread = useSelector(getCampaignProspectsUnread);
  const [toggles, setToggle] = useState([]);

  const unreadSmsList = campaignProspectsUnread.map(
    prospectsToItemList({
      updateCampaignProspectFn: updateCampaignProspectsUnread,
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
    <div className="pageContent">
      <TabbedHeader data={{}}><h1 className='text-white text-left m-0'>New Messages</h1></TabbedHeader>
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
    </div>
  );
}

export default NewMessages;
