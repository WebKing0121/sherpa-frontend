import React from 'react';
import Header from '../../components/Header';
import SearchModule from '../../components/SearchModule';
import List from '../../components/List/List';

function MainInfo() {
  return (
    <span>1234 Five Ave. <br /> Colorado Springs, CO 80915</span>
  );
}

const prospect = {
  name: "Lottie Ortiz",
  readable: false,
  isRead: false,
  folder: false,
  subInfo: "(559) 244-4245",
  mainInfo: <MainInfo />,
  indicator: "Initial Message Sent",
  link: "#",
};

function ProspectsSearch(props) {
  return (
    <div>
      <Header>Prospects Search</Header>
      <SearchModule />
      <List items={[prospect]} />
    </div>
  );
}

export default ProspectsSearch;
