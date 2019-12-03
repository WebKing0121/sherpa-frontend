import React  from 'react';
import styled from 'styled-components';
import { Label} from 'reactstrap';

const PreviewText = styled.p`
  background: var(--ghostBlue);
  padding: var(--pad3) 0;
  line-height: 1.5 !important;
  position: relative;
  margin: 0;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(-1 * var(--pad3));
    background: var(--ghostBlue);
    width: 100vh;
    height: 100%;
    z-index: -99;
  }
`;

const TemplateTag = styled.span`
  background: var(--highlight);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CharCount = styled.span`
  color: var(--darkGray);
`;

const Wrapper = styled.div`
  padding-top: var(--pad4);
`;

function ReviewSend(props) {
  return (
    <Wrapper>
      <Header>
        <Label for="previewText">Preview</Label>
        <CharCount className="textM">142/160 Characters</CharCount>
      </Header>
      <PreviewText className="textL mt-1">
        Hi <TemplateTag>[First Name]</TemplateTag>, my name is Kelly and I would like to speak with you about purchasing <TemplateTag>[Street Address]</TemplateTag>. Did I reach out to the right person? Thank you.
      </PreviewText>
    </Wrapper>
  );
}

export default ReviewSend;
