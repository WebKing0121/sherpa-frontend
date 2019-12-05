import React from 'react';
import InputGroupBorder from '../../../components/InputGroupBorder';
import { Label, Input, InputGroupAddon, Button } from 'reactstrap';
import IconBg from '../../../components/IconBg';
import styled from 'styled-components';

const FieldWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: var(--pad4);
  }
`;

const Field = (props) => {
  return (
    <FieldWrapper>
      <Label>{props.label}</Label>
      <InputGroupBorder className="mb-2">
        <Input type="text" name={props.id} id={props.id} placeholder={props.placeholder}/>
        <InputGroupAddon addonType="append">
          <Button className="p-0" color="link" onClick={props.onclick}><IconBg icon={props.icon} size="lg"/></Button>
        </InputGroupAddon>
      </InputGroupBorder>
    </FieldWrapper>
  );
}

const FieldsSection = (props) => {

  return (
    <>
      <Field
        id="agent"
        label="Agent"
        placeholder="Select Agent"
        icon="headset"/>

      <Field
        id="relay"
        label="SMS & Call Relay"
        placeholder="Select Call Relay Number"
        icon="mobile-alt"/>

      <Field
        id="crm"
        label="CRM Options"
        placeholder="Select CRM Option"
        icon="share"/>

      <Field
        id="reminder"
        label="Reminder"
        placeholder="Set a Reminder"
        icon="bell"/>
    </>
  );
}

export default FieldsSection;
