import React from 'react';
import Header from '../../components/Header';
import SearchModule from '../../components/SearchModule';
import List from '../../components/List/List';

function ProspectsSearch(props) {
  return (
    <div>
      <Header>Prospects Search</Header>
      <SearchModule/>
      <List/>
    </div>
  );
}

export default ProspectsSearch;
