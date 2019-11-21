import React from 'react';
import Header from '../../components/Header';
import SearchModule from '../../components/SearchModule';
import List from '../../components/List/List';

const campaign = {
  name: "Denver Metro Intial Send - 2018",
  readable: true,
  isRead: false,
  folder: true,
  subInfo: "5 Campaigns",
  mainInfo: "",
  indicator: "",
  link: "#",
};

const CampaignsPage = () => {
  return (
    <div>
      <Header>Campaigns</Header>
      <SearchModule/>
      <List item={campaign}/>
    </div>
  )
}

export default CampaignsPage;
