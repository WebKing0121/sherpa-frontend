import React, { useEffect, useState } from 'react';
import InputGroupBorder from '../../../components/InputGroupBorder';
import { Label, Input, InputGroupAddon, Button, FormGroup, CustomInput } from 'reactstrap';
import IconBg from '../../../components/IconBg';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import InputSelect from '../../../components/InputSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../../components/Modal';
import {
  agentSelector,
  prospectDetailsCampaigns,
  prospectDetails,
  selectedAgent
} from '../../../store/ProspectDetails/selectors';
import {
  fetchAgents,
  setProspectReminder,
  setProspectRelay,
  updateCampaignAgent
} from '../../../store/ProspectDetails/actions';
import Datetime from 'react-datetime';
import moment from 'moment-timezone';

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
        value={props.value}
        icon={props.icon}
      >
        {props.children}
      </InputSelect>
    </FieldWrapper>
  );
};

const ModalBackPlate = styled.div`
  content: '';
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  top: 0;
  left: 0;
  background: #0000005c;
  display: none;
`;

const FieldDateTime = (props) => {
  const renderInput = (_props, openCalendar, closeCalendar) => {
    return (
      <>
        <Label>{props.label}</Label>
        <InputGroupBorder className="mb-2">
          <Input {..._props} />
          <InputGroupAddon addonType="append">
            <Button className="p-0" color="link" onClick={openCalendar}>
              <IconBg icon={props.icon} size="lg" />
            </Button>
          </InputGroupAddon>
        </InputGroupBorder>
        <ModalBackPlate className="modalBackPlate" onClick={closeCalendar}/>
      </>
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
    id: "",
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
  const agent = useSelector(selectedAgent);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const {
    prospectId,
    reminderDateLocal,
    sherpaPhoneNumber,
    smsRelayMap: { rep: { id } }
  } = useSelector(prospectDetails);

  useEffect(() => {
    // if there's a prospect we want to get the company-id to fetch agents
    if (campaigns.length > 0) {
      let companyId = campaigns[0].id;
      dispatch(fetchAgents(companyId));
    }
  }, [dispatch, campaigns]);

  // agent controls
  const onAgentChange = (e) => {
    const { target: { value } } = e;
    const { id, name, company, market, createdBy, priorityCount } = campaigns[0];
    let payload = { name, company, market, createdBy, priorityCount, owner: value };
    dispatch(updateCampaignAgent(id, payload));
  };

  // SMS RELAY
  const onRelayChange = (e) => {
    let { target: { value } } = e;
    dispatch(setProspectRelay({ prospect: prospectId, rep: parseInt(value) }));
  };

  // REMINDERS
  const onBlur = (selectedDT) => {
    if (selectedDT) {
      dispatch(
        setProspectReminder(
          prospectId,
          { time: selectedDT.utc().format() }
        )
      );
    }
  };

  return (
    <>
      <FieldSelect
        name="status"
        id="statusSelect"
        label="Agent"
        onChange={onAgentChange}
        value={agent}
        icon={
          <IconBg icon="headset" size="lg" />
        }
      >
        {RenderAgentOptions(agents)}
      </FieldSelect>

      {sherpaPhoneNumber ?
        <FieldSelect
          id="relay"
          name="sms_relay"
          label="SMS & Call Relay"
          placeholder="Select Call Relay Number"
          onChange={onRelayChange}
          value={id}
          icon={
            <IconBg icon="mobile-alt" size="lg" />
          } >
          {RenderRelayOptions(agents)}
        </FieldSelect> : null}

      <FieldWrapper>
        <FieldDateTime
          id="reminder"
          label="Reminder"
          placeholder="Set a Reminder"
          icon="bell"
          onBlur={onBlur}
          defaultValue={new moment(reminderDateLocal)}
        />
      </FieldWrapper>

      <FieldWrapper>
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
            <Label className="fw-black textL mb-2" for="campaigns">Complete your action using the following campaign:</Label>
            <FormGroup className="mt-1 mb-3">
              <Radio type="radio" name="campaigns" label="San Francisco" id="camp1" />
              <Radio type="radio" name="campaigns" label="Seattle/Tac" id="camp2" />
              <Radio type="radio" name="campaigns" label="Another Campaign" id="camp3" />
            </FormGroup>
            <Button color="primary" block size="lg">Submit</Button>
          </Modal>
        </BtnHolster>
      </FieldWrapper>
    </>
  );
};

export default FieldsSection;
