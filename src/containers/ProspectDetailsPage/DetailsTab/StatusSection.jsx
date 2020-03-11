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
import { DropdownItem, Label } from 'reactstrap';
import IconBg from '../../../components/IconBg';
const StatusActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

const FieldWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: var(--pad4);
  }
  .iconBg {
    color: var(--sherpaBlue);
  }
`;
const DetailsTab = props => {
  const prospectId = useSelector(activeProspectSelector);

  return (
    <div>
      <StatusActions>
        <StatusActionBtns prospectId={prospectId} />
      </StatusActions>
    </div>
  );
};

export default DetailsTab;
