import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  actionBtnStatusSelector
} from '../store/uiStore/prospectDetailsView/selectors';
import { LoadingSpinner } from './LoadingSpinner';
import { prospectUpdateStatus } from '../store/prospectStore/thunks';
import { getProspect } from '../store/prospectStore/selectors';

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
  svg {
    margin-right: .5rem;
  }
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

const StatusActionBtns = props => {
  const { prospectId } = props;
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
      className={ 'textM fw-black ' + props.className }
      isLoading={item.status}
    >
      <LoadingSpinner
        isLoading={item.status}
        size='1.125em'
        color='var(--gray)'
        renderContent={() => (
          <>
            <FontAwesomeIcon icon={item.icon} />
            {item.text}
          </>
        )}
      />
    </StatusAction>
  ));
  return (
    <>
    {statusActions}
    </>
  );
};
export default StatusActionBtns;
