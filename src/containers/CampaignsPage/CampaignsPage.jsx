import React from 'react';
import Header from '../../components/Header';
import SearchModule from '../../components/SearchModule';
import List from '../../components/List/List';

const CampaignsPage = () => {
  return (
    <div>
      <Header>Campaigns</Header>
      <SearchModule/>
      <List/>
    </div>
  )
}

export default CampaignsPage;
