import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import InputSelect from '../../../components/InputSelect2';
import StatusActionBtns from '../../../components/StatusActionBtns';
import {
  activeProspectSelector,
} from '../../../store/uiStore/prospectDetailsView/selectors';
import { prospectUpdateOptimistically } from '../../../store/prospectStore/thunks';
import { getLeadStages } from '../../../store/leadstages/selectors';
import { getProspect } from '../../../store/prospectStore/selectors';
import { DropdownItem } from 'reactstrap';

const StatusActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

const DetailsTab = props => {
  const leadStages = useSelector(getLeadStages);
  const prospectId = useSelector(activeProspectSelector);
  const prospect = useSelector(getProspect(prospectId));
  const dispatch = useDispatch();

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

  let activeLead = 0;
  for (var i = 0; i < leadStages.length; i++) {
    if (leadStages[i].id === prospect.leadStage) {
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
      <StatusActions>
        <StatusActionBtns prospectId={prospectId} />
      </StatusActions>
    </div>
  );
};

export default DetailsTab;
