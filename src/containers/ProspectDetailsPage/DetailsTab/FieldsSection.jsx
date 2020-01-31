import React, { useEffect, useState } from 'react';
import InputGroupBorder from '../../../components/InputGroupBorder';
import {
  Label,
  DropdownItem,
  Input,
  InputGroupAddon,
  Button,
  FormGroup,
  CustomInput
} from 'reactstrap';
import IconBg from '../../../components/IconBg';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import InputSelect from '../../../components/InputSelect2';
import Modal from '../../../components/Modal';
import {
  agentSelector,
  activeProspectSelector,
  activeCampaignSelector
} from '../../../store/uiStore/prospectDetailsView/selectors';
import { getProspect } from '../../../store/prospectStore/selectors';
import {
  prospectUpdateOptimistically,
  prospectSetRelay,
  prospectSetReminder,
  prospectRemoveRelay,
  prospectEmailToCrmAction,
  prospectPushToZapierAction
} from '../../../store/prospectStore/thunks';
import {
  setActiveCampaign,
  clearActiveCampaign
} from '../../../store/uiStore/prospectDetailsView/actions';
import Datetime from 'react-datetime';
import moment from 'moment-timezone';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BtnHolster = styled.div`
  display: flex;
  padding-top: var(--pad3);
  justify-content: space-between;

  button {
    flex-basis: 50%;
    overflow: hidden;
    position: relative;

    &[disabled] {
      border-color: var(--green);
      cursor: disabled;
      &:after {
        width: 3px;
        height: 3px;
        transition: all 0.2s ease-in-out;
        transform: translate(-50%, -50%) scale(200);
      }
    }

    &:first-child {
      margin-right: var(--pad2);
    }

    &:after {
      content: '';
      width: 0;
      height: 0;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1);
      background: var(--green);
      transition: transform 10s;
      z-index: -1;
    }
  }
`;

const Radio = styled(CustomInput)`
  font-size: 1.25rem;
  line-height: 1.2;
  margin-bottom: 0.6em;
  font-weight: bold;

  &[disabled] {
    color: var(--mediumGray);
  }
`;

const FieldWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: var(--pad4);
  }
  svg {
    color: var(--sherpaBlue);
  }
`;

const FieldSelect = props => {
  let active = 0;

  for (var i = 0; i < props.options.length; i++) {
    let selectedKey = parseInt(props.value);
    let agentNum = props.options[i].props.value;

    if (agentNum === selectedKey) {
      active = parseInt(props.options[i].key);
    }
  }

  return (
    <FieldWrapper>
      <Label>{props.label}</Label>
      <InputSelect
        data-test={props.dataTest}
        id={props.id}
        value={props.options[active].props.children}
        icon={props.icon}
        options={props.options}
        placeholder={props.options[0].fullName}
      />
    </FieldWrapper>
  );
};

const BtnSuccessWrapper = styled.div`
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    margin-left: 0.6em;
  }
`;

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

const FieldDateTime = props => {
  const renderInput = (_props, openCalendar, closeCalendar) => {
    return (
      <div data-test='reminder-date-picker' onClick={openCalendar}>
        <Label>{props.label}</Label>
        <InputGroupBorder className='mb-2'>
          <Input {..._props} disabled={true} />
          <InputGroupAddon addonType='append'>
            <Button className='p-0' color='link'>
              <IconBg icon={props.icon} size='lg' />
            </Button>
          </InputGroupAddon>
        </InputGroupBorder>
        <ModalBackPlate className='modalBackPlate' onClick={closeCalendar} />
      </div>
    );
  };

  return <Datetime renderInput={renderInput} onBlur={props.onBlur} defaultValue={props.defaultValue} />;
};

const RenderAgentOptions = (agents, emptyOption, onClick) => {
  let newAgents = [emptyOption, ...agents];
  let options = newAgents.map((agent, idx) => (
    <DropdownItem onClick={onClick} key={idx} value={agent.id}>
      {agent.fullName}
    </DropdownItem>
  ));
  return options;
};

// TODO: Break all these fields into their own
// sub-component to avoid re-renders
const FieldsSection = () => {
  const prospectId = useSelector(activeProspectSelector);
  const prospect = useSelector(getProspect(prospectId));
  const activeCampaignId = useSelector(activeCampaignSelector);
  const agents = useSelector(agentSelector);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [emailToCrm, setEmailtoCrm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldBtnStatus, setFieldBtnStatus] = useState({
    isEmailingToCrm: false,
    isPushingToZapier: false
  });
  const {
    agent,
    reminderDateLocal,
    sherpaPhoneNumber,
    emailedToPodio,
    pushedToZapier,
    zillowLink,
    campaigns,
    smsRelayMap: {
      rep: { id }
    }
  } = prospect;
  const activeCampaign = campaigns.find(campaign => campaign.id === activeCampaignId) || {};

  // clears active-campaign when navigating away
  useEffect(() => () => dispatch(clearActiveCampaign()), [dispatch]);

  // agent controls
  const emptyAgentOption = {
    id: '',
    fullName: 'Select an Agent',
    phone: '',
    role: ''
  };
  const onAgentChange = e => {
    const {
      target: { value }
    } = e;
    let payload = { agent: parseInt(value) };
    dispatch(prospectUpdateOptimistically(prospect.id, payload));
  };

  // SMS RELAY
  const emptyRelayOption = {
    id: '',
    fullName: 'None',
    phone: '',
    role: ''
  };
  const onRelayChange = e => {
    let {
      target: { value }
    } = e;
    // if none-selected then remove it
    if (!value) {
      dispatch(prospectRemoveRelay(prospect.id, { smsRelayMap: null }));
    } else {
      // add new relay
      dispatch(
        prospectSetRelay({
          prospect: prospect.id,
          rep: parseInt(value)
        })
      );
    }
  };

  // REMINDERS
  const onBlur = selectedDT => {
    if (selectedDT) {
      dispatch(prospectSetReminder(prospect.id, { time: selectedDT.utc().format() }));
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    if (emailToCrm) {
      // dispatch that action
      dispatch(prospectEmailToCrmAction(prospect.id, { campaign: activeCampaign.id })).then(() => {
        setSubmitting(false);
        setModal(false);
      });
    } else {
      // dispatch other action
      dispatch(prospectPushToZapierAction(prospect.id, { campaign: activeCampaign.id })).then(() => {
        setSubmitting(false);
        setModal(false);
      });
    }
  };

  const campaignOnChange = campaign => e => {
    dispatch(setActiveCampaign(campaign.id));
  };

  const handleFieldBtnClick = (action, field) => {
    const args = [prospect.id, { campaign: activeCampaign.id }];
    const newFieldBtnStatus = { ...fieldBtnStatus, [field]: false };
    if (activeCampaignId) {
      setFieldBtnStatus({ ...fieldBtnStatus, [field]: true });
      dispatch(action(...args)).then(() => setFieldBtnStatus(newFieldBtnStatus));
    } else {
      setModal(true);
      setEmailtoCrm(field === 'isEmailingToCrm' ? true : false);
    }
  };
  let agentOpts = RenderAgentOptions(agents, emptyAgentOption, onAgentChange);
  let relayOpts = RenderAgentOptions(agents, emptyRelayOption, onRelayChange);
  return (
    <>
      <FieldSelect
        name='status'
        id='statusSelect'
        label='Agent'
        value={agent || 0}
        icon={<IconBg icon='headset' size='lg' />}
        dataTest='agent-drop-down'
        options={agentOpts}
      />

      {sherpaPhoneNumber ? (
        <FieldSelect
          id='relay'
          name='sms_relay'
          label='SMS & Call Relay'
          placeholder='Select Call Relay Number'
          value={id}
          icon={<IconBg icon='mobile-alt' size='lg' />}
          dataTest='sms-relay-drop-down'
          options={relayOpts}
        />
      ) : null}

      <FieldWrapper>
        <FieldDateTime
          id='reminder'
          label='Reminder'
          placeholder='Set a Reminder'
          icon='bell'
          onBlur={onBlur}
          defaultValue={new moment(reminderDateLocal)}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>CRM Options</Label>
        <BtnHolster>
          <Button
            id='zapier'
            data-test='email-to-crm-btn'
            color='primary'
            className='fw-bold'
            disabled={emailedToPodio || !activeCampaign.podioPushEmailAddress}
            onClick={() => handleFieldBtnClick(prospectEmailToCrmAction, 'isEmailingToCrm')}
          >
            {fieldBtnStatus.isEmailingToCrm || emailedToPodio ? (
              <LoadingSpinner
                isLoading={fieldBtnStatus.isEmailingToCrm}
                color='white'
                size='1em'
                renderContent={() => (
                  <BtnSuccessWrapper>
                    Emailed to CRM <FontAwesomeIcon size='sm' icon='check' />
                  </BtnSuccessWrapper>
                )}
              />
            ) : (
                'Email to CRM'
              )}
          </Button>
          <Button
            id='crm'
            data-test='push-to-zapier-btn'
            color='primary'
            className='fw-bold'
            disabled={pushedToZapier || !activeCampaign.zapierWebhook}
            onClick={() => handleFieldBtnClick(prospectPushToZapierAction, 'isPushingToZapier')}
          >
            {fieldBtnStatus.isPushingToZapier || pushedToZapier ? (
              <LoadingSpinner
                isLoading={fieldBtnStatus.isPushingToZapier}
                color='white'
                size='1em'
                border='3px'
                renderContent={() => (
                  <BtnSuccessWrapper>
                    Pushed to Zapier <FontAwesomeIcon icon='check' />
                  </BtnSuccessWrapper>
                )}
              />
            ) : (
                'Push to Zapier'
              )}
          </Button>

          <Modal isOpen={modal} toggle={() => setModal(false)} title='Campaigns'>
            <form onSubmit={onSubmit}>
              <Label className='fw-black textL mb-2'>
                Complete your action using the following campaign:
              </Label>
              <FormGroup className='mt-1 mb-3' htmlFor='campaigns'>
                {campaigns.map((campaign, idx) => (
                  <Radio
                    key={idx}
                    type='radio'
                    name='campaigns'
                    label={campaign.name}
                    defaultChecked={activeCampaign.id === campaign.id}
                    value={campaign.id}
                    onChange={campaignOnChange(campaign)}
                    id={idx}
                  />
                ))}
              </FormGroup>
              <Button
                color='primary'
                block
                size='lg'
                disabled={
                  !activeCampaign.id ||
                  (emailToCrm && (emailedToPodio || !activeCampaign.podioPushEmailAddress)) ||
                  (!emailToCrm && (pushedToZapier || !activeCampaign.zapierWebhook))
                }
              >
                <LoadingSpinner isLoading={submitting} color='light' renderContent={() => <>Submit</>} />
              </Button>
            </form>
          </Modal>
        </BtnHolster>
      </FieldWrapper>
      <FieldWrapper className='text-center'>
        {zillowLink ? (
          <a href={zillowLink} rel='noopener noreferrer' target='_blank'>
            View property on Zillow
          </a>
        ) : null}
      </FieldWrapper>
    </>
  );
};

export default FieldsSection;
