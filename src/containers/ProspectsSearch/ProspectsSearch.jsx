import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SearchModule from '../../components/SearchModule';
import List from '../../components/List/List';
import { searchProspects } from '../../store/Prospects/actions';
import { prospectsToItemList } from './utils';
import { prospectsResults, prospectSearchState } from '../../store/Prospects/selectors';

function ProspectsSearch(props) {
  const prospects = useSelector(prospectsResults);
  const isSearching = useSelector(prospectSearchState);
  const dispatch = useDispatch();

  // search function
  const search = (term) => {
    dispatch(searchProspects(term));
  };

  // transform prospect data into the appropriate data-interface for ItemList
  const prospectList = prospectsToItemList(prospects);

  return (
    <div>
      <Header>Prospects Search</Header>
      <SearchModule searchTerm={search} />
      {isSearching ? <p>Loading...</p> : <List items={prospectList} />}
    </div>
  );
}

export default ProspectsSearch;
