import React from 'react';
import {
  Container, Row, Col,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import styled from 'styled-components';
import Icon from './Icon.jsx';

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
              <Button className="p-0" color="link"><Icon name="search" width="34px"/></Button>
            </InputGroupAddon>
          </StyledInputGroup>
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
