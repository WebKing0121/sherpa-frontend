import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import InputSelect from '../../../components/InputSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  updateVerifiedStatus,
  updateDncStatus, updatePriorityStatus,
  updateQualifiedStatus, updateLeadstage
} from '../../../store/ProspectDetails/actions';
import {
  prospectDetailsData,
  prospectBtnStatus
} from '../../../store/ProspectDetails/selectors';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { Updating } from '../../../variables';
import { getLeadStages } from '../../../store/leadstages/selectors';

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

  transition: background-color .2s, transform .25s cubic-bezier(0.15, 0.75, 1, 1.45);

  .spinner-border {
    width: 1.125em;
    height: 1.125em;
    border-width: .2em;
    color: var(--gray) !important;
  }
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

const getNewVerifiedStatus = status => {
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
  const prospect = useSelector(prospectDetailsData);
  const actionBtnStatus = useSelector(prospectBtnStatus);
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
      action: updateVerifiedStatus,
      status: actionBtnStatus.verifiedBtnStatus
    },
    {
      text: 'DNC',
      color: 'red',
      icon: 'phone-slash',
      active: doNotCall,
      attr: 'doNotCall',
      action: updateDncStatus,
      status: actionBtnStatus.dncBtnStatus
    },
    {
      text: 'Priority',
      color: 'orange',
      icon: 'bolt',
      active: isPriority,
      attr: 'isPriority',
      action: updatePriorityStatus,
      status: actionBtnStatus.priorityBtnStatus
    },
    {
      text: 'Qualified',
      color: 'purple',
      icon: 'star',
      active: isQualifiedLead,
      attr: 'isQualifiedLead',
      action: updateQualifiedStatus,
      status: actionBtnStatus.qualifiedBtnStatus
    }
  ];

  // render lead options
  const leadOptions = leadStages.map((item, key) => (
    <option key={key} value={item.id}>
      {item.leadStageTitle}
    </option>
  ));

  // onchange status
  const onStatusChange = (attr, action) => () => {
    let value = !prospect[attr];
    // special case for verified status as it is not a boolean but a
    // string
    if (attr === 'ownerVerifiedStatus') {
      let currentValue = prospect[attr];
      value = getNewVerifiedStatus(currentValue);
    }
    dispatch(action(prospect.id, { [attr]: value }));
  };

  // render statusActions
  const statusActions = statusList.map((item, key) => (
    <StatusAction
      key={key}
      attr={item.attr}
      onClick={onStatusChange(item.attr, item.action)}
      color={item.color}
      active={item.active}
      className="textM fw-black"
      isLoading={item.status === Updating}
    >
      <LoadingSpinner
        isLoading={item.status === Updating}
        renderContent={() => (
          <>
            <FontAwesomeIcon className="mr-2" icon={item.icon} />
            {item.text}
          </>)}
      />
    </StatusAction>
  ));

  // on change lead
  const onLeadStageChange = e => {
    let value = e.target.value;
    dispatch(updateLeadstage(prospect.id, { leadStage: value }));
  };

  return (
    <>
      <InputSelect
        name='status'
        id='statusSelect'
        onChange={onLeadStageChange}
        value={prospect.leadStage || ''}
        icon={<FontAwesomeIcon icon='chevron-up' rotation={180} />}
      >
        {leadOptions}
      </InputSelect>

      <StatusActions>{statusActions}</StatusActions>
    </>
  );
};

export default DetailsTab;
