import React, { useEffect, useState } from 'react';
import InputGroupBorder from '../../../components/InputGroupBorder';
import { Label, Input, InputGroupAddon, Button } from 'reactstrap';
import IconBg from '../../../components/IconBg';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { agentSelector, prospectDetailsCampaigns, prospectDetailsId } from '../../../store/ProspectDetails/selectors';
import { fetchAgents, setProspectReminder, setProspectRelay } from '../../../store/ProspectDetails/actions';
import InputSelect from '../../../components/InputSelect';
import Datetime from 'react-datetime';
import moment from 'moment-timezone';

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
        <Input type="text" name={props.id} id={props.id} placeholder={props.placeholder} />
        <InputGroupAddon addonType="append">
          <Button className="p-0" color="link" onClick={props.onclick}><IconBg icon={props.icon} size="lg" /></Button>
        </InputGroupAddon>
      </InputGroupBorder>
    </FieldWrapper>
  );
}


const FieldSelect = (props) => {
  return (
    <FieldWrapper>
      <Label>{props.label}</Label>
      <InputSelect
        name={props.status}
        id={props.id}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        icon={props.icon}
      >
        {props.children}
      </InputSelect>
    </FieldWrapper>
  );
}

const FieldDateTime = (props) => {
  const renderInput = (_props, openCalendar, closeCalendar) => {
    return (
      <div>
        <FieldWrapper>
          <Label>{props.label}</Label>
          <InputGroupBorder className="mb-2">
            <Input {..._props} />
            <InputGroupAddon addonType="append">
              <Button className="p-0" color="link" onClick={openCalendar}>
                <IconBg icon={props.icon} size="lg" />
              </Button>
            </InputGroupAddon>
          </InputGroupBorder>
        </FieldWrapper>
      </div>
    );
  };

  return (
    <Datetime renderInput={renderInput} onBlur={props.onBlur} defaultValue={props.defaultValue} />
  );
};

const RenderAgentOptions = (agents) => {
  let emptyAgentOption = {
    id: "",
    fullName: "Select an Agent",
    phone: "",
    role: "",
  };
  let newAgents = [emptyAgentOption, ...agents];
  return newAgents.map((agent, idx) => (
    <option
      key={idx}
      value={agent.id}
      disabled={idx === 0}
    >
      {agent.fullName}
    </option>
  ));
}

const RenderRelayOptions = (relayData) => {
  const emptyRelayOption = {
    id: null,
    fullName: "",
    phone: "None",
    role: "",
  };
  let newRelay = [emptyRelayOption, ...relayData];
  return newRelay.map((relay, idx) => (
    <option
      key={idx}
      value={relay.id}
    >
      {relay.phone}
    </option>
  ));
};

const FieldsSection = (props) => {
  const campaigns = useSelector(prospectDetailsCampaigns);
  const agents = useSelector(agentSelector);
  const dispatch = useDispatch();
  const { prospectId, reminderDateLocal } = useSelector(prospectDetailsId);

  useEffect(() => {
    // if there's a prospect we want to get the company-id to fetch agents
    if (campaigns.length > 0) {
      let companyId = campaigns[0].id;
      dispatch(fetchAgents(companyId));
    }
  }, [dispatch, campaigns]);

  // agent controls
  const onAgentChange = (e) => {
    // dispatch()
    console.log('hi');
  };

  // SMS RELAY
  const onRelayChange = (e) => {
    let value = e.target.value;
    dispatch(setProspectRelay({ prospect: prospectId, rep: parseInt(value) }));
  };

  // REMINDERS
  const onBlur = (selectedDT) => {
    dispatch(setProspectReminder(prospectId, { time: selectedDT.utc().format() }));
  };

  return (
    <>
      <FieldSelect
        name="status"
        id="statusSelect"
        label="Agent"
        onChange={onAgentChange}
        defaultValue={""}
        icon={
          <IconBg icon="headset" size="lg" />
        }
      >
        {RenderAgentOptions(agents)}
      </FieldSelect>

      <FieldSelect
        id="relay"
        name="sms_relay"
        label="SMS & Call Relay"
        placeholder="Select Call Relay Number"
        onChange={onRelayChange}
        defaultValue={null}
        icon={
          <IconBg icon="mobile-alt" size="lg" />
        } >
        {RenderRelayOptions(agents)}
      </FieldSelect>

      <Field
        id="crm"
        label="CRM Options"
        placeholder="Select CRM Option"
        icon="share" />

      <FieldDateTime
        id="reminder"
        label="Reminder"
        placeholder="Set a Reminder"
        icon="bell"
        onBlur={onBlur}
        defaultValue={new moment(reminderDateLocal)}
      />
    </>
  );
}

export default FieldsSection;
