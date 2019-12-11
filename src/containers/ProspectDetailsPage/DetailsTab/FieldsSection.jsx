import React, { useEffect } from 'react';
import InputGroupBorder from '../../../components/InputGroupBorder';
import { Label, Input, InputGroupAddon, Button } from 'reactstrap';
import IconBg from '../../../components/IconBg';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { prospectDetailsData, agentSelector, prospectDetailsCampaigns } from '../../../store/ProspectDetails/selectors';
import { fetchAgents } from '../../../store/ProspectDetails/actions';
import InputSelect from '../../../components/InputSelect';

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


const FieldsSection = (props) => {
  const prospect = useSelector(prospectDetailsData);
  const campaigns = useSelector(prospectDetailsCampaigns);
  const agents = useSelector(agentSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    // if there's a prospect we want to get the company-id to fetch agents
    console.log("CAMPAIGNS", campaigns);
    if (campaigns.length > 0) {
      console.log("FETCHING AGENTS", prospect);
      let companyId = campaigns[0].id;
      dispatch(fetchAgents(companyId));
    }
  }, [campaigns]);

  const onChange = (e) => console.log("OOP", e.target.value);
  const agentOptions = agents.map((agent, idx) => (
    <option key={idx} value={agent.fullname}>{agent.fullname}</option>
  ));


  return (
    <>
      <FieldSelect
        name="status"
        id="statusSelect"
        label="Agent"
        onChange={onChange}
        defaultValue={""}
        icon={
          <IconBg icon="headset" size="lg" />
        }
      >
        {agentOptions}
      </FieldSelect>

      <Field
        id="relay"
        label="SMS & Call Relay"
        placeholder="Select Call Relay Number"
        icon="mobile-alt" />

      <Field
        id="crm"
        label="CRM Options"
        placeholder="Select CRM Option"
        icon="share" />

      <Field
        id="reminder"
        label="Reminder"
        placeholder="Set a Reminder"
        icon="bell" />
    </>
  );
}

export default FieldsSection;
