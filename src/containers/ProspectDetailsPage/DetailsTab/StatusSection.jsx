import React from 'react';
import styled from 'styled-components';
import InputSelect from '../../../components/InputSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Pill = styled.div`
  background: ${props => !props.active ? "white" : "var(--" + props.color + ")"};
  color: ${props => !props.active ? "var(--gray)" : "white"};
  padding: .6em var(--pad2);
  border-radius: 2em;
  border: 2px solid;
  border-color: ${props => !props.active ? "currentColor" : "var(--" + props.color + ")"};
  margin: var(--pad2) 0 0;
  flex-basis: 48%;
  flex-shrink: 2;
  text-align: center;
`;

const StatusPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

const DetailsTab = (props) => {
  const leadOpts = [
    "Follow-Up",
    "Initial Message Sent",
    "Refer to Agent",
    "Apppointment",
    "Pushed to Podio",
    "Dead"
  ];

  const statusList = [
    {
      status: "Verified",
      color: "green",
      icon: "check",
      active: true
    },
    {
      status: "DNC",
      color: "red",
      icon: "phone-slash",
      active: true
    },
    {
      status: "Priority",
      color: "orange",
      icon: "bolt",
      active: false
    },
    {
      status: "Qualified",
      color: "purple",
      icon: "star",
      active: true
    }
  ];

  const leadOptions = leadOpts.map((item, key) =>
    <option key={key}>{item}</option>
  );

  const pills = statusList.map((item, key) =>
    <Pill key={key} color={item.color} active={item.active}className="textM fw-black"><FontAwesomeIcon className="mr-2" icon={item.icon}/>{item.status}</Pill>
  );

  return (
    <>
      <InputSelect name="status" id="statusSelect">
        {leadOptions}
      </InputSelect>

      <StatusPills>
        {pills}
      </StatusPills>
    </>
  );
}

export default DetailsTab;
