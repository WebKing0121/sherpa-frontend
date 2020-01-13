import React from 'react';
import InputSelect from '../components/InputSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SortModule(props) {
  const { sortOptions, sortChange, marketId, defaultValue = -1 } = props;

  const onSortChange = e => {
    let sortBy = sortOptions[e.target.value].value;
    sortChange(sortBy);
  };

  const sortBy = sortOptions.map((item, key) => (
    <option key={key} value={key}>
      {item.name}
    </option>
  ));

  // adds an empty default option to the dropdown select
  sortBy.unshift(
    <option key={'unset'} value={-1} style={{ display: 'none' }}>
      Sort By
    </option>
  );

  return (
    <>
      <InputSelect
        name='sort'
        id='sortOrder'
        onChange={onSortChange}
        value={defaultValue}
        icon={<FontAwesomeIcon icon='chevron-up' rotation={180} />}
      >
        {sortBy}
      </InputSelect>
    </>
  );
}

export default SortModule;
