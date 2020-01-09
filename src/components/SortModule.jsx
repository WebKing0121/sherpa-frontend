import React from 'react';
import InputSelect from '../components/InputSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SortModule(props) {
  const { sortOptions, sortChange, marketId } = props;

  const onSortChange = (e) => {
    let sortBy = sortOptions[e.target.value].value;
    sortChange(sortBy, marketId);
  };

  const sortBy = sortOptions.map((item, key) =>
    <option key={key} value={key}>{item.name}</option>
  );

  // adds an empty default option to the dropdown select
  sortBy.unshift(<option key={'unset'} style={{ display: 'none' }}>Sort By</option>);

  return (
    <>
      <InputSelect
        name="sort"
        id="sortOrder"
        onChange={onSortChange}
        icon={
          <FontAwesomeIcon icon="chevron-up" rotation={180} />
        }
      >
        {sortBy}
      </InputSelect>
    </>
  )
}

export default SortModule;
