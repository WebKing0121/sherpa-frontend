import React, { useEffect, useState } from 'react';
import InputGroupBorder from '../../../components/InputGroupBorder';
import { Label, Input, InputGroupAddon, Button, FormGroup, CustomInput } from 'reactstrap';
import IconBg from '../../../components/IconBg';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  prospectDetailsData,
  agentSelector,
  prospectDetailsCampaigns
} from '../../../store/ProspectDetails/selectors';
import { fetchAgents } from '../../../store/ProspectDetails/actions';
import InputSelect from '../../../components/InputSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../../components/Modal';

const BtnHolster = styled.div`
  display: flex;
  padding-top: var(--pad3);
  justify-content: space-between;

  button {
    flex-basis: 50%;

    &:first-child {
      margin-right: var(--pad2);
    }
  }
`;

const Radio = styled(CustomInput)`
  font-size: 1.25rem;
  line-height: 1.2;
  margin-bottom: .6em;
  font-weight: bold;

  &[disabled] {
    color: var(--mediumGray);
  }
`;

const FieldWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: var(--pad4);
  }
`;

const Field = props => {
  return (
    <FieldWrapper>
      <Label>{props.label}</Label>
      <InputGroupBorder className='mb-2'>
        <Input type='text' name={props.id} id={props.id} placeholder={props.placeholder} />
        <InputGroupAddon addonType='append'>
          <Button className='p-0' color='link' onClick={props.onclick}>
            <IconBg icon={props.icon} size='lg' />
          </Button>
        </InputGroupAddon>
      </InputGroupBorder>
    </FieldWrapper>
  );
};

const FieldSelect = props => {
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
};

const FieldsSection = props => {
  const prospect = useSelector(prospectDetailsData);
  const campaigns = useSelector(prospectDetailsCampaigns);
  const agents = useSelector(agentSelector);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    // if there's a prospect we want to get the company-id to fetch agents
    console.log('CAMPAIGNS', campaigns);
    if (campaigns.length > 0) {
      console.log('FETCHING AGENTS', prospect);
      let companyId = campaigns[0].id;
      dispatch(fetchAgents(companyId));
    }
  }, [campaigns, dispatch, prospect]);

  const onChange = e => console.log('OOP', e.target.value);
  const agentOptions = agents.map((agent, idx) => (
    <option key={idx} value={agent.fullname}>
      {agent.fullname}
    </option>
  ));

  return (
    <>
      <FieldSelect
        name='status'
        id='statusSelect'
        label='Agent'
        onChange={onChange}
        defaultValue={''}
        icon={<IconBg icon='headset' size='lg' />}
      >
        {agentOptions}
      </FieldSelect>

      <Field
        id='relay'
        label='SMS & Call Relay'
        placeholder='Select Call Relay Number'
        icon='mobile-alt'
      />

      <Field id='reminder' label='Reminder' placeholder='Set a Reminder' icon='bell' />

      <Label>CRM Options</Label>

      <BtnHolster>
        <Button id='zapier' color="primary" className="fw-bold" onClick={() => setModal(true)}>Email to CRM</Button>
        <Button id='crm' color="primary" className="fw-bold" onClick={() => setModal(true)}>Push to Zapier</Button>
        {/*  This should be the success state below:
        <Button id='crm' color="success" className="fw-bold">
          <FontAwesomeIcon icon="check" className="mr-1" />
          Sent!
        </Button> */}
        <Modal isOpen={modal} toggle={() => setModal(false)} title='Campaigns'>
          <Label><h4>Complete your action using the following campaign:</h4></Label>
          <FormGroup className="mt-1 mb-3">
            <Radio type="radio" name="campaigns" label="San Francisco" id="camp1"/>
            <Radio type="radio" name="campaigns" label="Seattle/Tac" id="camp2"/>
            <Radio type="radio" name="campaigns" label="Another Campaign" id="camp3"/>
          </FormGroup>
          <Button color="primary" block size="lg">Submit</Button>
        </Modal>
      </BtnHolster>

    </>
  );
};

export default FieldsSection;
