import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import List from '../../../components/List/List';
import Select from '../../../components/InputSelect';

import { campaignsList, campaignsStatus, activeMarket } from '../../../store/Campaigns/selectors';
import { marketsList } from '../../../store/Markets/selectors';
import { campaignsToItemList } from './utils';
import { fetchSortedCampaigns } from '../../../store/Campaigns/actions';
import { DataLoader } from '../../../components/LoadingData';

const ListTab = styled.div`
  padding: var(--pad3) var(--pad3);
`;

const FilterSortSection = styled.div`
  display: flex;
  margin-bottom: var(--pad2);

  .groups {
    flex-basis: 100%;
    margin-right: var(--pad3);

    ul {
      display: flex;
      margin: 0;
      align-items: center;
      padding: 0;
      border-bottom: 2px solid var(--mediumGray);
      height: 100%;

      li {
        font-size: 1.125rem;
        margin-right: 3.5em;
        padding: 1rem 0;
        position: relative;
        cursor: pointer;

        &.active {
          color: var(--sherpaBlue);
          font-weight: bold;

          &:after {
            content: '';
            position: absolute;
            bottom: -3px;
            height: 4px;
            width: 100%;
            left: 0%;
            background: var(--sherpaBlue);
          }
        }
      }
    }
  }

  .sortBy {
    flex-basis: 200px;
  }
`;

const groupAction = (e) => {
}

const FilterSort = props => {

  return (
    <FilterSortSection>
      <div className="groups">
        <ul>
          <li className="active" onClick={groupAction}>All</li>
          <li onClick={groupAction}>Active</li>
          <li onClick={groupAction}>Follow-Up</li>
          <li onClick={groupAction}>Owned By Me</li>
          <li onClick={groupAction}>Archived</li>
        </ul>
      </div>
      <div className="sortBy">
        {// replace with sortModule
        }
        <Select>
          {//replace with sort Options
          }
          <option>Alphabetical</option>
          <option>Created By</option>
          <option>By Date</option>
          <option>By Owner</option>
        </Select>
      </div>
    </FilterSortSection>
  );
};

const CampaignsListTab = props => {
  const activeMarketId = useSelector(activeMarket);
  const campaigns = useSelector(campaignsList);
  const campaignFolders = useSelector(marketsList);
  const isFetching = useSelector(campaignsStatus);
  const dispatch = useDispatch();

  const sortingOptions = [
    {
      name: 'Alphabetical',
      value: 'name'
    },
    {
      name: 'Created Date',
      value: 'created_date'
    },
    {
      name: 'Status %',
      value: 'status'
    }
  ];

  // dispatch fetchCampaigns
  useEffect(() => {
    // refetch campaigns list if markets navigation has changed or the campaigns list has changed
    dispatch(fetchSortedCampaigns());
  }, [dispatch]);

  // transform campaigns to proper list item views
  const listItems = campaignsToItemList(campaigns);

  return (
    <ListTab>
      <FilterSort />
      <DataLoader status={isFetching} data={listItems} renderData={() => <List items={listItems} />} />
    </ListTab>
  );
};

export default CampaignsListTab;
