import React, { useState } from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import CalloutSection from './CalloutSection';
import Icon from '../../../components/Icon';
import LinkBtn from '../../../components/TextBtn';
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
  position: absolute;
  width: 100%;
  --timing: .15s;
  transition:
    left var(--timing) ease,
    transform var(--timing) ease;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -120%;
    --sheen: white;
    background: linear-gradient(
      125deg,
      transparent 0%,
      transparent 30%,
      var(--sheen) 40%,
      var(--sheen) 60%,
      transparent 70%,
      transparent
    );
    transition:
      left calc( var(--timing) * 3 ),
      background var(--timing);
  }

  &.lead {
    &-enter {
      left: -120%;
      transform: scale(1);

      &:after {
        left: -100%;
      }

      &-active {
        left: 0%;
        transform: scale(1);

        &:after {
          left: 100%;
        }
      }
      &-done {
        transform: scale(1);
        filter: blur(0px);

        &:after {
          left: 100%;
        }
      }
    }
    &-exit {
      left: 0%;
      transform: scale(1);
      opacity: 1;

      &:after {
        display: none;
      }

      &-active {
        transition-duration: calc( var(--timing) * 6 );
        left: 120%;
        opacity: .7;
        z-index: 999999;
        filter: blur(2px);
        transform: scale(.3);
        transform-origin: top right;
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


  return (
    <>
      <CalloutSection/>

      <LeadWrapper>
        <TransitionStyling
          in={showMessage1}
          timeout={300}
          classNames="lead"
          unmountOnExit
        >
          <div>
            <LeadInfo>
              <h3 className="fw-bold name">Wayne Hanson</h3>
              <p className="phoneNum textM">(720) 439-2142</p>
              <p className="address m-0 textL">3147 Mobile Way, Aurora, CO 80013</p>
            </LeadInfo>

            <PreviewText className="textL">
              Hi <b>Wayne</b>, my name is Kelly and I would like to speak with you about purchasing <b>3147 Mobile Way</b>. Did I reach out to the right person? Thank you.
            </PreviewText>
          </div>
        </TransitionStyling>

        <TransitionStyling
          in={showMessage2}
          timeout={300}
          classNames="lead"
          unmountOnExit
        >
          <div>
            <LeadInfo>
              <h3 className="fw-bold name">John Johnson</h3>
              <p className="phoneNum textM">(123) 565-2142</p>
              <p className="address m-0 textL">1222 Testing Way, Aurora, CO 80013</p>
            </LeadInfo>

            <PreviewText className="textL">
              Hi <b>Aaron</b>, my name is Kelly and I would like to speak with you about purchasing <b>1234 Mulberry Lane</b>. Did I reach out to the right person? Thank you.
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
          color="primary"
          size="lg"
          block
          onClick={() => {
            if (showMessage1) {
              setShowMessage1(false);
              setTimeout(function() {
                setShowMessage2(true)
              },200);
            } else {
              setShowMessage2(false);
              setTimeout(function() {
                setShowMessage1(true)
              },200);
            }
          }}
        >
          <Icon name="sendWhite" margin="mr-1 mb-1"/>Send
        </Button>

      </ButtonSection>
    </>
  );
}

export default ReviewSend;
