import React, { useState } from 'react';
import styled from 'styled-components';
import InputGroupBorder from '../../../components/InputGroupBorder';
import Icon from '../../../components/Icon';
import { Button, Input, Label, InputGroupAddon } from 'reactstrap';
import Preview from './Preview';

const PaddedContent = styled.div`
  padding: var(--pad4) var(--pad3);
`;

function SelectTemplate(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const onChange = (e) => setSearchTerm(e.target.value);

  return (
    <PaddedContent>
      <Label for="SearchField">Template</Label>
      <InputGroupBorder className="mb-2">
        <Input type="text" name="Search" id="SearchField" placeholder="Search" value={searchTerm} onChange={onChange} />
        <InputGroupAddon addonType="append">
          <Button className="p-0" color="link"><Icon name="notification" width="34px" /></Button>
        </InputGroupAddon>
      </InputGroupBorder>

      <Preview/>

      <Button color="primary" size="lg" block className="mt-4">Use Template</Button>
    </PaddedContent>
  );
}

export default SelectTemplate;
