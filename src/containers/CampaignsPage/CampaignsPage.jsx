import React, { useEffect } from 'react';
import Header from '../../components/Header';
// import SearchModule from '../../components/SearchModule';
import List from '../../components/List/List';
import { useDispatch, useSelector } from 'react-redux';

import { campaignsList } from '../../store/Campaigns/selectors';
import { campaignsToItemList } from './utils';
import { fetchCampaigns } from '../../store/Campaigns/actions';


const CampaignsPage = (props) => {
  const campaigns = useSelector(campaignsList);
  const dispatch = useDispatch();
  const { match: { params: { id } } } = props;

  // dispatch fetchCampaigns
  useEffect(() => dispatch(fetchCampaigns(id)), []);

  // transform campaigns to proper list item views
  const listItems = campaignsToItemList(campaigns);

  return (
    <div>
      <Header>Campaigns</Header>
      {/* <SearchModule />  */}
      <List items={listItems} />
    </div>
  );
};

export default CampaignsPage;
