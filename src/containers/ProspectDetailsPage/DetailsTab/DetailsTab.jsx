import React from 'react';
import styled from 'styled-components';

import Status from './StatusSection';
import Fields from './FieldsSection';

const Section = styled.div`
  padding-left: var(--pad3);
  padding-right: var(--pad3);
  &:not(:last-child) {
    border-bottom: 1px solid var(--mediumGray);
  }
`;
const StatusSection = styled(Section)`
  padding-top: var(--pad1);
  padding-bottom: var(--pad3);
`;
const PaddedSection = styled(Section)`
  padding-top: var(--pad4);
  padding-bottom: var(--pad4);
`;

const DetailsTab = () => {
  return (
    <>
      <StatusSection>
        <Status />
      </StatusSection>

      <PaddedSection>
        <Fields />
      </PaddedSection>
    </>
  );
};

export default DetailsTab;
