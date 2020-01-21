import React, { useState } from 'react';
import { Container, Row, Col, Button, Input, InputGroupAddon } from 'reactstrap';
import styled from 'styled-components';
import IconBg from './IconBg';
import InputGroupBorder from './InputGroupBorder';
import SortModule from './SortModule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: var(--pad1);
`;
const Pill = styled.div`
  background: var(--sherpaTeal);
  padding: var(--pad1) var(--pad2);
  border-radius: var(--pad4);
  margin: var(--pad1) var(--pad1) 0 0;
  color: white;
  font-weight: 900;
  font-size: .8rem;

  svg {
    margin-left: var(--pad1);
  }
`;

const StyledSearch = styled(Container)`
  padding: var(--pad2) var(--pad3) !important;
  background: var(--ghostBlue);
`;

function SearchModule(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const onChange = e => setSearchTerm(e.target.value);
  const onClick = e => props.searchTerm(searchTerm);

  return (
    <StyledSearch data-test={props.dataTest || ''}>
      <Row>
        {props.showSearch && (
          <Col>
            <InputGroupBorder className='mb-2'>
              <Input
                type='text'
                name='Search'
                placeholder='Search'
                value={searchTerm}
                onChange={onChange}
              />
              <InputGroupAddon addonType='append'>
                <Button disabled={searchTerm.length < 3} className='p-0' color='link' onClick={onClick}>
                  <IconBg color='primary' width='36px' height='36px' textcol='white' icon='search' />
                </Button>
              </InputGroupAddon>
            </InputGroupBorder>
          </Col>
        )}

        {props.showSort && (
          <Col>
            <SortModule
              marketId={props.marketId}
              sortOptions={props.sortingOptions}
              sortChange={props.sortChange}
              defaultValue={props.defaultValue}
            />
          </Col>
        )}

        {props.showFilter && (
          <Col className='d-flex align-items-center' xs='auto'>
            {props.children}
          </Col>
        )}
      </Row>
      {props.filters ? (
        <FilterPills>
          {props.filters.map((filter) => (
            <Pill>{filter}<FontAwesomeIcon icon="times" /></Pill>

          ))}
        </FilterPills>)
        : null}
    </StyledSearch>
  );
}

export default SearchModule;
