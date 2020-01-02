import React, { useState } from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import CalloutSection from './CalloutSection';
import Icon from '../../../components/Icon';
import { CSSTransition } from 'react-transition-group';

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
    width: 100vw;
    height: 100%;
    z-index: -99;
  }
`;

const TransitionStyling = styled(CSSTransition)`
  position: relative;
  width: 100%;
  --timing: 0.07s;
  transition: left var(--timing) ease, transform var(--timing) ease;

  &.words {
    &-enter {
      left: -120%;
      transform: scale(0.8);

      &-active {
        left: 0%;
        filter: blur(1px);
        transform: scale(1);
      }
    }
    &-exit {
      left: 0%;
      transform: scale(1);

      &-active {
        transition-easing-function: ease-in;
        left: 120%;
        filter: blur(1px);
        transform: scale(0.8);
      }
    }
  }
`;

const LeadWrapper = styled.div`
  min-height: 330px;
  position: relative;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;

  padding: var(--pad4) var(--pad3);
`;

function ReviewSend(props) {
  const [showMessage1, setShowMessage1] = useState(true);
  const [showMessage2, setShowMessage2] = useState(false);

  const transProps = {};
  transProps.timeout = 70;
  transProps.classNames = 'words';
  transProps.unmountOnExit = true;

  return (
    <>
      <CalloutSection />

      <LeadWrapper>
        <TransitionStyling in={showMessage1} {...transProps}>
          <div>
            <LeadInfo>
              <h3 className='fw-bold name'>Wayne Hanson</h3>
              <p className='phoneNum textM'>(720) 439-2142</p>
              <p className='address m-0 textL'>3147 Mobile Way, Aurora, CO 80013</p>
            </LeadInfo>

            <PreviewText className='textL'>
              Hi <b>Wayne</b>, my name is Kelly and I would like to speak with you about purchasing{' '}
              <b>3147 Mobile Way</b>. Did I reach out to the right person? Thank you.
            </PreviewText>
          </div>
        </TransitionStyling>
        <TransitionStyling in={showMessage2} {...transProps}>
          <div>
            <LeadInfo>
              <h3 className='fw-bold name'>John Johnson</h3>
              <p className='phoneNum textM'>(111) 439-2142</p>
              <p className='address m-0 textL'>123 Mobile Way, Aurora, CO 80013</p>
            </LeadInfo>

            <PreviewText className='textL'>
              Hi <b>Wayne</b>, my name is TERT and I would like to speak with you about purchasing{' '}
              <b>3147 Mobile Way</b>. Did I reach out to the right person? Thank you.
            </PreviewText>
          </div>
        </TransitionStyling>
      </LeadWrapper>

      <ButtonSection>
        {
          // <LinkBtn color="orange"><Icon name="skip" margin="mr-1"/>Skip</LinkBtn>
          // <LinkBtn color="red"><Icon name="dnc" margin="mr-1"/>DNC</LinkBtn>
        }
        <Button
          color='primary'
          size='lg'
          block
          onClick={() => {
            if (showMessage1) {
              setShowMessage1(false);
              setTimeout(function() {
                setShowMessage2(true);
              }, 85);
            } else {
              setShowMessage2(false);
              setTimeout(function() {
                setShowMessage1(true);
              }, 85);
            }
          }}
        >
          <Icon name='sendWhite' margin='mr-1 mb-1' />
          Send
        </Button>
      </ButtonSection>
    </>
  );
}

export default ReviewSend;
