import React from 'react';
import {
  Container, Row, Col,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import styled from 'styled-components';
import search from '../assets/images/icons/search.svg';
import filter from '../assets/images/icons/filter.svg';

const StyledSearch = styled(Container)`
  padding: var(--pad2) var(--pad3) !important;
  background: var(--ghostBlue);
`;

const StyledInputGroup = styled(InputGroup)`
  border-bottom: 1px solid var(--mediumGray) !important;
`;

function SearchModule(props) {
  return (
    <StyledSearch>
      <Row>
        <Col>
          <StyledInputGroup className="mb-2">
            <Input type="text" name="Search" id="SearchField" placeholder="Search" />
            <InputGroupAddon addonType="append">
              <Button className="p-0" color="link"><img src={search} width="34" alt="search"/></Button>
            </InputGroupAddon>
          </StyledInputGroup>
        </Col>
        <Col className="d-flex align-items-center" xs="auto">
          <Button className="p-0 mb-2" color="link"><img src={filter} alt="search"/></Button>
        </Col>
      </Row>
    </StyledSearch>
  );
}

export default SearchModule;
