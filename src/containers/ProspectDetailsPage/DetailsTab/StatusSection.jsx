import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import InputSelect from '../../../components/InputSelect2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  activeProspectSelector,
  actionBtnStatusSelector
} from '../../../store/uiStore/prospectDetailsView/selectors';
import { prospectUpdateStatus, prospectUpdateOptimistically } from '../../../store/prospectStore/thunks';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { getLeadStages } from '../../../store/leadstages/selectors';
import { getProspect } from '../../../store/prospectStore/selectors';
import { DropdownItem } from 'reactstrap';

const StatusAction = styled.div`
  background: ${props => {
    let bg = '';

    if (!props.active) {
      bg = 'white';
    } else {
      bg = 'var(--' + props.color + ')';
    }
    if (props.isLoading) {
      bg = 'var(--lightGray)';
    }

    return bg;
  }};
  transform: ${props => {
    let scl = 'scale(1)';

    if (props.isLoading) {
      scl = 'scale(.95)';
    }

    return scl;
  }};
  color: ${props => (!props.active ? 'var(--gray)' : 'white')};
  padding: 0.6em var(--pad2);
  border-radius: 2em;
  border: 2px solid;
  border-color: ${props => {
    let bc = '';

    if (!props.active) {
      bc = 'currentColor';
    } else {
      bc = 'var(--' + props.color + ')';
    }

    if (props.isLoading) {
      bc = 'var(--gray)';
    }

    return bc;
  }};
  margin: var(--pad2) 0 0;
  flex-basis: 48%;
  flex-shrink: 2;
  text-align: center;

  transition: background-color 0.2s, transform 0.25s cubic-bezier(0.15, 0.75, 1, 1.45);
`;

const StatusActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

const OPEN = 'open';
const VERIFIED = 'verified';
const UNVERIFIED = 'unverified';

export const getNewVerifiedStatus = status => {
  switch (status) {
    case OPEN:
      return VERIFIED;
    case UNVERIFIED:
      return VERIFIED;
    case VERIFIED:
      return UNVERIFIED;
    default:
      return OPEN;
  }
};

const DetailsTab = props => {
  const leadStages = useSelector(getLeadStages);
  const prospectId = useSelector(activeProspectSelector);
  const prospect = useSelector(getProspect(prospectId));
  const actionBtnStatus = useSelector(actionBtnStatusSelector);
  const dispatch = useDispatch();

  const {
    ownerVerifiedStatus = false,
    doNotCall = false,
    isQualifiedLead = false,
    isPriority = false
  } = prospect;

  const statusList = [
    {
      text: 'Verified',
      color: 'green',
      icon: 'check',
      active: ownerVerifiedStatus === 'verified',
      attr: 'ownerVerifiedStatus',
      status: actionBtnStatus.ownerVerifiedStatus
    },
    {
      text: 'DNC',
      color: 'red',
      icon: 'phone-slash',
      active: doNotCall,
      attr: 'doNotCall',
      status: actionBtnStatus.doNotCall
    },
    {
      text: 'Priority',
      color: 'orange',
      icon: 'bolt',
      active: isPriority,
      attr: 'isPriority',
      status: actionBtnStatus.isPriority
    },
    {
      text: 'Qualified',
      color: 'purple',
      icon: 'star',
      active: isQualifiedLead,
      attr: 'isQualifiedLead',
      status: actionBtnStatus.isQualifiedLead
    }
  ];

  // on change lead
  const onLeadStageChange = e => {
    let value = e.target.value;
    // ignore default optoin
    if (value) {
      dispatch(prospectUpdateOptimistically(prospect.id, { leadStage: parseInt(value) }));
    }

  };

  // render lead options
  let leadOptions = leadStages.map((item, key) => (
    <DropdownItem onClick={onLeadStageChange} key={key} value={item.id}>
      {item.leadStageTitle}
    </DropdownItem>
  ));
  leadOptions.unshift(
    <DropdownItem onClick={onLeadStageChange} key={1000} value={0}>Select Lead Stage</DropdownItem>
  );

  // onchange status
  const onStatusChange = attr => () => {
    let value = !prospect[attr];
    // special case for verified status as it is not a boolean but a
    // string
    if (attr === 'ownerVerifiedStatus') {
      let currentValue = prospect[attr];
      value = getNewVerifiedStatus(currentValue);
    }
    dispatch(prospectUpdateStatus(prospect.id, { [attr]: value }, attr));
  };

  // render statusActions
  const statusActions = statusList.map((item, key) => (
    <StatusAction
      data-test='status-action-button'
      key={key}
      attr={item.attr}
      onClick={onStatusChange(item.attr)}
      color={item.color}
      active={item.active}
      className='textM fw-black'
      isLoading={item.status}
    >
      <LoadingSpinner
        isLoading={item.status}
        size='1.125em'
        color='var(--gray)'
        renderContent={() => (
          <>
            <FontAwesomeIcon className='mr-2' icon={item.icon} />
            {item.text}
          </>
        )}
      />
    </StatusAction>
  ));

  let activeLead = 0;
  for (var i = 0; i < leadStages.length; i++) {
    if (leadStages[i].id == prospect.leadStage) {
      activeLead = leadStages[i].leadStageTitle;
    }
  }

  return (
    <div data-test='prospect-lead-stages-drop-down'>
      <InputSelect
        id='statusSelect'
        value={activeLead}
        placeholder={"Select Lead Stage"}
        options={leadOptions}
      />

      <StatusActions>{statusActions}</StatusActions>
    </div>
  );
};

export default DetailsTab;
