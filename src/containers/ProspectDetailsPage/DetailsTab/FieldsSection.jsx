import React, { useEffect, useState } from 'react';
import InputGroupBorder from '../../../components/InputGroupBorder';
import { Label, Input, InputGroupAddon, Button, FormGroup, CustomInput } from 'reactstrap';
import IconBg from '../../../components/IconBg';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import InputSelect from '../../../components/InputSelect';
import Modal from '../../../components/Modal';
import {
  agentSelector,
  activeProspectSelector,
  activeCampaignSelector
} from '../../../store/uiStore/prospectDetailsView/selectors';
import {
  getProspect
} from '../../../store/prospectStore/selectors';
import {
  prospectUpdateOptimistically,
  prospectSetRelay,
  prospectSetReminder,
  prospectRemoveRelay,
  prospectEmailToCrmAction,
  prospectPushToZapierAction,
} from '../../../store/prospectStore/thunks';
import {
  setActiveCampaign,
  clearActiveCampaign,
} from '../../../store/uiStore/prospectDetailsView/actions';
import Datetime from 'react-datetime';
import moment from 'moment-timezone';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

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
        <ModalBackPlate className="modalBackPlate" onClick={closeCalendar} />
      </>
    );
  };

  return (
    <Datetime renderInput={renderInput} onBlur={props.onBlur} defaultValue={props.defaultValue} />
  );
};

const RenderAgentOptions = (agents, emptyOption) => {
  let newAgents = [emptyOption, ...agents];
  return newAgents.map((agent, idx) => (
    <option
      key={idx}
      value={agent.id}
    >
      {agent.fullName}
    </option>
  ));
};

// TODO: Break all these fields into their own
// sub-component to avoid re-renders
const FieldsSection = (props) => {
  const prospectId = useSelector(activeProspectSelector);
  const prospect = useSelector(getProspect(prospectId));
  const activeCampaignId = useSelector(activeCampaignSelector);
  const agents = useSelector(agentSelector);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [emailToCrm, setEmailtoCrm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const {
    agent,
    reminderDateLocal,
    sherpaPhoneNumber,
    emailedToPodio,
    pushedToZapier,
    zillowLink,
    campaigns,
    smsRelayMap: { rep: { id } }
  } = prospect;
  const activeCampaign = campaigns.find(
    campaign => campaign.id === activeCampaignId
  ) || {};

  // clears active-campaign when navigating away
  useEffect(() => () => dispatch(clearActiveCampaign()), []);

  // agent controls
  const emptyAgentOption = {
    id: "",
    fullName: "Select an Agent",
    phone: "",
    role: "",
  };
  const onAgentChange = (e) => {
    const { target: { value } } = e;
    let payload = { agent: value };
    dispatch(prospectUpdateOptimistically(prospect.id, payload));
  };

  // SMS RELAY
  const emptyRelayOption = {
    id: "",
    fullName: "None",
    phone: "",
    role: "",
  };
  const onRelayChange = (e) => {
    let { target: { value } } = e;

    // if none-selected then remove it
    if (!value) {
      dispatch(prospectRemoveRelay(prospect.id, { smsRelayMap: null }));
    } else {
      // add new relay
      dispatch(prospectSetRelay({
        prospect: prospect.id,
        rep: parseInt(value)
      }));
    }
  };

  // REMINDERS
  const onBlur = (selectedDT) => {
    if (selectedDT) {
      dispatch(
        prospectSetReminder(
          prospect.id,
          { time: selectedDT.utc().format() }
        )
      );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (emailToCrm) {
      // dispatch that action
      dispatch(
        prospectEmailToCrmAction(
          prospect.id, { campaign: activeCampaign.id }
        )
      )
        .then(() => {
          setSubmitting(false);
          setModal(false);
        });
    } else {
      // dispatch other action
      dispatch(prospectPushToZapierAction(prospect.id, { campaign: activeCampaign.id }))
        .then(() => {
          setSubmitting(false);
          setModal(false);
        });
    }
  };

  const campaignOnChange = (campaign) => (e) => {
    dispatch(setActiveCampaign(campaign.id));
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
        {RenderAgentOptions(agents, emptyAgentOption)}
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
          {RenderAgentOptions(agents, emptyRelayOption)}
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
          <Button
            id="zapier"
            color="primary"
            className="fw-bold"
            onClick={
              () => { setModal(true); setEmailtoCrm(true); }
            }>
            Email to CRM
          </Button>
          <Button
            id="crm"
            color="primary"
            className="fw-bold"
            onClick={
              () => { setModal(true); setEmailtoCrm(false); }
            }>
            Push to Zapier
          </Button>

          <Modal
            isOpen={modal}
            toggle={() => setModal(false)}
            title='Campaigns'>
            <form onSubmit={onSubmit} >
              <Label className="fw-black textL mb-2" >Complete your action using the following campaign:</Label>
              <FormGroup className="mt-1 mb-3" htmlFor="campaigns">
                {campaigns.map((campaign, idx) => (
                  <Radio
                    key={idx}
                    type="radio"
                    name="campaigns"
                    label={campaign.name}
                    defaultChecked={activeCampaign.id === campaign.id}
                    value={campaign.id}
                    onChange={campaignOnChange(campaign)}
                    id={idx} />
                ))}
              </FormGroup>
              <Button
                color="primary"
                block
                size="lg"
                disabled={
                  (!activeCampaign.id ||
                    ((emailToCrm &&
                      (emailedToPodio || !activeCampaign.podioPushEmailAddress)) ||
                      (!emailToCrm &&
                        (pushedToZapier || !activeCampaign.zapierWebhook))))
                }>
                <LoadingSpinner
                  isLoading={submitting}
                  color="light"
                  renderContent={() => (<>Submit</>)}
                />
              </Button>
            </form>
          </Modal>
          {/* {zillowLink ? <render Link stuff/> : null} */}
        </BtnHolster>
      </FieldWrapper>
    </>
  );
};

export default FieldsSection;
