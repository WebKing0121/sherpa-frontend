import React from 'react';
import styled from 'styled-components';
import InputSelect from '../../../components/InputSelect';
import { Label } from 'reactstrap';
import Preview from './Preview';

const PaddedContent = styled.div`
  padding: var(--pad4) var(--pad3);
`;

function SelectTemplate(props) {
  const { templateChoices, templateId, choseTemplate } = props;

  const templateOptions = Object.entries(templateChoices).map(([key, value]) =>
    <option key={key} value={value.id}>
      {value.templateName}
    </option>
  );

  const msg = templateChoices[templateId] ? templateChoices[templateId].message : '';

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

      <Preview message={msg} />
    </PaddedContent>
  );
}

export default SelectTemplate;
