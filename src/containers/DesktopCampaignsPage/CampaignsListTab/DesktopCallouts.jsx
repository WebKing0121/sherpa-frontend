import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Callouts = styled.div`
  display: flex;
  justify-content: space-around;
  flex-grow: 2;
  flex-basis: 50%;

  .callout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .value {
    margin-bottom: 5px;
  }
  .icon {
    margin-right: 5px;
  }
`;
const Icon = styled(FontAwesomeIcon)`
  color: var(--${props => props.color});
`;
const Callout = props => {
  const icon = (
    <Icon
      icon={props.icon ? props.icon : ''}
      size="xs"
      className="icon"
      color={props.iconCol}
    />
  );

  return (
    <div className="callout">
      <p className="value textL fw-bold">
        {props.icon ? icon : null}
        {props.value}
      </p>
      <p className="label mb-0 textM darkGray">{props.label}</p>
    </div>
  );
};

const DesktopCallouts = props => {
  return (
    <Callouts>
      <Callout value="989" label="Leads" icon="user" iconCol="sherpaTeal"/>
      <Callout value="3" label="Priority" icon="bolt" iconCol="orange"/>
      <Callout value="100%" label="Status"/>
      <Callout value="Good" label="Health"/>
      <Callout value="Denver Metro" label="Market"/>
    </Callouts>
  );
};

export default DesktopCallouts;
