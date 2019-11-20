import React from 'react';
import Header from '../../components/Header.jsx';
import SearchModule from '../../components/SearchModule.jsx';
import List from '../../components/List.jsx';

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
