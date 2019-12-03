import React from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import CalloutSection from './CalloutSection';
import Icon from '../../../components/Icon';
import LinkBtn from '../../../components/TextBtn';

const LeadInfo = styled.div`
  text-align: center;
  padding: var(--pad5) var(--pad3);

  .phoneNum {
    color: var(--gray);
  }
`;

const PreviewText = styled.p`
  background: var(--ghostBlue);
  padding: var(--pad3) 0;
  line-height: 1.5 !important;
  position: relative;
  margin: 0;
  padding: var(--pad4) var(--pad3);

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

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;

  padding: var(--pad4) var(--pad3);
`;

function ReviewSend(props) {
  return (
    <>
      <CalloutSection/>

      <LeadInfo>
        <h3 className="fw-bold name">Wayne Hanson</h3>
        <p className="phoneNum textM">(720) 439-2142</p>
        <p className="address m-0 textL">3147 Mobile Way, Aurora, CO 80013</p>
      </LeadInfo>

      <PreviewText className="textL">
        Hi <b>Wayne</b>, my name is Kelly and I would like to speak with you about purchasing <b>3147 Mobile Way</b>. Did I reach out to the right person? Thank you.
      </PreviewText>

      <ButtonSection>
        <LinkBtn color="orange"><Icon name="skip" margin="mr-1"/>Skip</LinkBtn>
        <LinkBtn color="red"><Icon name="dnc" margin="mr-1"/>DNC</LinkBtn>
        <Button color="primary" size="lg"><Icon name="sendWhite" margin="mr-1 mb-1"/>Send</Button>
      </ButtonSection>
    </>
  );
}

export default ReviewSend;
