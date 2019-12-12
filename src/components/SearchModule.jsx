import React, { useState } from 'react';
import {
  Container, Row, Col,
  Button,
  Input,
  InputGroupAddon
} from 'reactstrap';
import styled from 'styled-components';
import IconBg from './IconBg';
import InputGroupBorder from './InputGroupBorder';
import Filter from './FilterButton';
import SortModule from './SortModule';

const StyledSearch = styled(Container)`
  padding: var(--pad2) var(--pad3) !important;
  background: var(--ghostBlue);
`;

function SearchModule(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const onChange = (e) => setSearchTerm(e.target.value);
  const onClick = (e) => props.searchTerm(searchTerm);

  return (
    <StyledSearch>
      <Row>
        {props.showSearch &&
          <Col>
            <InputGroupBorder className="mb-2">
              <Input type="text" name="Search" id="SearchField" placeholder="Search" value={searchTerm} onChange={onChange} />
              <InputGroupAddon addonType="append">
                <Button disabled={searchTerm.length < 3} className="p-0" color="link" onClick={onClick}>
                  <IconBg
                    color="primary"
                    width="36px"
                    height="36px"
                    textcol="white"
                    icon="search" />
                </Button>
              </InputGroupAddon>
            </InputGroupBorder>
          </Col>
        }

        {props.showSort &&
          <Col>
            <SortModule
              marketId={props.marketId}
              sortOptions={props.sortingOptions}
              sortChange={props.sortChange} />
          </Col>
        }

        {props.showFilter &&
          <Col className="d-flex align-items-center" xs="auto">
            <Filter />
          </Col>
        }

      </Row>
    </StyledSearch>
  );
}

export default SearchModule;
