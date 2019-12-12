import React from 'react';
import { useDispatch } from 'react-redux';
import InputSelect from '../components/InputSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SortModule(props) {
  const dispatch = useDispatch();
  const { sortOptions, sortChange, marketId } = props;

  const onSortChange = (e) => {
    let sortBy = e.target.value;
    dispatch(sortChange(sortBy, marketId));
  };

  const sortBy = sortOptions.map((item, key) =>
    <option key={key} value={item.value}>{item.name}</option>
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
