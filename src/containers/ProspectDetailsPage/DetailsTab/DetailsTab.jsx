import React from 'react';
import styled from 'styled-components';

import Zillow from './ZillowSection';
import Status from './StatusSection';
import Fields from './FieldsSection';

const Section = styled.div`
  padding-left: var(--pad3);
  padding-right: var(--pad3);
  border-bottom: 1px solid var(--mediumGray);
`;
const StatusSection = styled(Section)`
  padding-top: var(--pad1);
  padding-bottom: var(--pad3);
`;
const PaddedSection = styled(Section)`
  padding-top: var(--pad4);
  padding-bottom: var(--pad4);
`;

const DetailsTab = (props) => {
  return (
    <>
      <StatusSection>
        <Status />
      </StatusSection>

      <PaddedSection>
        <Zillow />
      </PaddedSection>

      <PaddedSection>
        <Fields />
      </PaddedSection>
    </>
  );
}

export default DetailsTab;
