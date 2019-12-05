import React from 'react';
import styled from 'styled-components';
import InputSelect from '../../../components/InputSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Pill = styled.div`
  background: ${props => "var(--" + props.color + ")"};
  color: ${props => props.color === "white" ? "var(--gray)" : "white"};
  padding: var(--pad1) var(--pad2);
  border-radius: 2em;
  border: 2px solid;
  border-color: ${props => props.color === "white" ? "currentColor" : "var(--" + props.color + ")"};
  margin: var(--pad3) var(--pad3) 0 0;

`;

const StatusPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
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
      icon: "check"
    },
    {
      status: "DNC",
      color: "white",
      icon: "phone-slash"
    },
    {
      status: "Priority",
      color: "orange",
      icon: "bolt"
    },
    {
      status: "Qualified",
      color: "purple",
      icon: "star"
    },
    {
      status: "Wrong Number",
      color: "yellow",
      icon: "times-circle"
    }
  ];

  const leadOptions = leadOpts.map((item, key) =>
    <option key={key}>{item}</option>
  );
  const pills = statusList.map((item, key) =>
    <Pill key={key} color={item.color} className="textM fw-black"><FontAwesomeIcon className="mr-1" icon={item.icon}/>{item.status}</Pill>
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
