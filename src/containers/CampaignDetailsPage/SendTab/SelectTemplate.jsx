import React from 'react';
import styled from 'styled-components';
import InputSelect from '../../../components/InputSelect';
import { Label } from 'reactstrap';
import Preview from './Preview';

const PaddedContent = styled.div`
  padding: var(--pad4) var(--pad3);
`;

function SelectTemplate(props) {
  const { templateChoices, templateId, smsMsg, choseTemplate } = props;

  const templateOptions = templateChoices.map((item, key) => (
    <option key={key} value={item.id}>
      {item.templateName}
    </option>
  ));

  return (
    <PaddedContent>
      <Label for='SearchField'>Template</Label>
      <InputSelect
        name='Search'
        id='SearchField'
        placeholder='Search'
        onChange={(e) => choseTemplate(e)}
        value={templateId}
      >
        {templateOptions}
      </InputSelect>

      <Preview message={smsMsg} />
    </PaddedContent>
  );
}

export default SelectTemplate;
