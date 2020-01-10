import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSmsTemplates } from '../../../store/SmsTemplateStore/actions';
import { smsTemplates } from '../../../store/SmsTemplateStore/selectors';
import styled from 'styled-components';
import InputSelect from '../../../components/InputSelect';
import { Label } from 'reactstrap';
import Preview from './Preview';

const PaddedContent = styled.div`
  padding: var(--pad4) var(--pad3);
`;

function SelectTemplate() {
  const [message, setTemplateMessage] = useState('');

  const dispatch = useDispatch();
  const sms_templates = useSelector(smsTemplates);

  useEffect(() => {
    dispatch(fetchSmsTemplates());
  }, [dispatch]);

  const templateOptions = sms_templates.map((item, key) => (
    <option key={key} value={item.templateName}>
      {item.templateName}
    </option>
  ));

  templateOptions.push(<option key={'no_template'} style={{ display: 'none' }}></option>);

  const handleChange = e => {
    const chosenTemplate = e.target.value;
    const templateMessage = sms_templates.filter(x => x.templateName === chosenTemplate);
    setTemplateMessage(templateMessage[0].message);
  };

  return (
    <PaddedContent>
      <Label for='SearchField'>Template</Label>
      <InputSelect name='Search' id='SearchField' placeholder='Search' onChange={handleChange}>
        {templateOptions}
      </InputSelect>

      <Preview message={message} />
    </PaddedContent>
  );
}

export default SelectTemplate;
