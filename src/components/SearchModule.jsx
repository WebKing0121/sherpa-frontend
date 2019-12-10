import React, { useState } from 'react';
import {
  Container, Row, Col,
  Button,
  Input,
  InputGroupAddon
} from 'reactstrap';
import styled from 'styled-components';

import Icon from './Icon.jsx';
import InputGroupBorder from './InputGroupBorder.jsx';

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
        <Col>
          <InputGroupBorder className="mb-2">
            <Input type="text" name="Search" id="SearchField" placeholder="Search" value={searchTerm} onChange={onChange} />
            <InputGroupAddon addonType="append">
              <Button disabled={searchTerm.length < 3} className="p-0" color="link" onClick={onClick}><Icon name="search" width="34px" /></Button>
            </InputGroupAddon>
          </InputGroupBorder>
        </Col>
        {false &&
          <Col className="d-flex align-items-center" xs="auto">
            <Button className="p-0 mb-2" color="link"><Icon name="filter" /></Button>
          </Col>
        }

      </Row>
    </StyledSearch>
  );
}

export default SearchModule;
