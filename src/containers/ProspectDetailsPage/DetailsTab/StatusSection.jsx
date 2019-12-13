import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import InputSelect from '../../../components/InputSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchLeadStages, updateProspect } from '../../../store/ProspectDetails/actions';
import { prospectDetailsData, leadStagesSelector } from '../../../store/ProspectDetails/selectors';


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

const OPEN = 'open';
const VERIFIED = 'verified';
const UNVERIFIED = 'unverified';

const getNewVerifiedStatus = (status) => {
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
}

const DetailsTab = (props) => {
  const leadStages = useSelector(leadStagesSelector);
  const prospect = useSelector(prospectDetailsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeadStages());
  }, []);

  const {
    ownerVerifiedStatus = false,
    doNotCall = false,
    isQualifiedLead = false,
    isPriority = false } = prospect;

  const statusList = [
    {
      status: "Verified",
      color: "green",
      icon: "check",
      active: ownerVerifiedStatus === "verified",
      attr: 'ownerVerifiedStatus'
    },
    {
      status: "DNC",
      color: "red",
      icon: "phone-slash",
      active: doNotCall,
      attr: 'doNotCall'
    },
    {
      status: "Priority",
      color: "orange",
      icon: "bolt",
      active: isPriority,
      attr: 'isPriority'
    },
    {
      status: "Qualified",
      color: "purple",
      icon: "star",
      active: isQualifiedLead,
      attr: 'isQualifiedLead'
    }
  ];

  // render lead options
  const leadOptions = leadStages.map((item, key) =>
    <option key={key} value={item.id}>{item.leadStageTitle}</option>
  );

  // onchange status
  const onStatusChange = (attr) => () => {
    let value = !prospect[attr];
    // special case for verified status as it is not a boolean but a
    // string
    if (attr === "ownerVerifiedStatus") {
      let currentValue = prospect[attr];
      value = getNewVerifiedStatus(currentValue);
    }
    dispatch(updateProspect(prospect.id, { [attr]: value }));
  };

  // render pills
  const pills = statusList.map((item, key) =>
    <Pill
      key={key}
      attr={item.attr}
      onClick={onStatusChange(item.attr)}
      color={item.color}
      active={item.active}
      className="textM fw-black">
      <FontAwesomeIcon className="mr-2" icon={item.icon} />
      {item.status}
    </Pill>
  );

  // on change lead
  const onLeadStageChange = (e) => {
    let value = e.target.value;
    dispatch(updateProspect(prospect.id, { leadStage: value }));
  };

  return (
    <>
      <InputSelect
        name="status"
        id="statusSelect"
        onChange={onLeadStageChange}
        value={prospect.leadStage || ""}
        icon={
          <FontAwesomeIcon icon="chevron-up" rotation={180} />
        }
      >
        {leadOptions}
      </InputSelect>

      <StatusPills>
        {pills}
      </StatusPills>
    </>
  );
}

export default DetailsTab;
