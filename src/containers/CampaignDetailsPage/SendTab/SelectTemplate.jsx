import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSmsTemplates } from '../../../store/CampaignDetails/sent/actions';
import { smsTemplates } from '../../../store/CampaignDetails/sent/selectors';
import styled from 'styled-components';
import InputGroupBorder from '../../../components/InputGroupBorder';
import Icon from '../../../components/Icon';
import { Button, Input, Label, InputGroupAddon } from 'reactstrap';
import Preview from './Preview';

const PaddedContent = styled.div`
  padding: var(--pad4) var(--pad3);
`;

function SelectTemplate() {
  const [searchTerm, setSearchTerm] = useState('');
  const onChange = e => setSearchTerm(e.target.value);

  const dispatch = useDispatch();
  const sms_templates = useSelector(smsTemplates);

  useEffect(() => {
    dispatch(fetchSmsTemplates());
  }, [dispatch]);

  return (
    <PaddedContent>
      <Label for='SearchField'>Template</Label>
      <InputGroupBorder className='mb-2'>
        <Input
          type='text'
          name='Search'
          id='SearchField'
          placeholder='Search'
          value={searchTerm}
          onChange={onChange}
        />
        <InputGroupAddon addonType='append'>
          <Button className='p-0' color='link'>
            <Icon name='notification' width='34px' />
          </Button>
        </InputGroupAddon>
      </InputGroupBorder>

      <Preview />
    </PaddedContent>
  );
}

export default SelectTemplate;
