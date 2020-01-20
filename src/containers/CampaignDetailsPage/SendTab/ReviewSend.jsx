import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { campaignsBatchProspects } from '../../../store/CampaignsBatchProspectsStore/selectors';
import { sendInitialSmsMessage } from '../.../../../../store/CampaignsBatchProspectsStore/actions';
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
        transition-timing-function: ease-in;
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

function renderLead({ transProps, campaignProspects, count }) {
  let show = false;
  return campaignProspects.map((x, idx) => {
    idx === count ? (show = true) : (show = false);
    return (
      <TransitionStyling in={show} {...transProps} key={x.id}>
        <div>
          <LeadInfo>
            <h3 className='fw-bold name'>{x.prospect.name}</h3>
            <p className='phoneNum textM'>{x.prospect.phoneDisplay}</p>
            <p className='address m-0 textL'>
              {`${x.prospect.propertyAddress}, ${x.prospect.propertyCity}, ${x.prospect.propertyState} ${x.prospect.propertyZip}`}
            </p>
          </LeadInfo>

          <PreviewText className='textL'>{x.smsMsgText}</PreviewText>
        </div>
      </TransitionStyling>
    );
  });
}

function ReviewSend(props) {
  const [count, setCount] = useState(0);
  const campaignProspects = useSelector(campaignsBatchProspects);
  const dispatch = useDispatch();

  const transProps = {};
  transProps.timeout = 70;
  transProps.classNames = 'words';
  transProps.unmountOnExit = true;

  const handleSend = () => {
    setCount(count + 1);
    dispatch(sendInitialSmsMessage(campaignProspects[count]));
  };

  return (
    <>
      <CalloutSection />

      <LeadWrapper>{renderLead({ campaignProspects, transProps, count })}</LeadWrapper>

      <ButtonSection>
        {
          // <LinkBtn color="orange"><Icon name="skip" margin="mr-1"/>Skip</LinkBtn>
          // <LinkBtn color="red"><Icon name="dnc" margin="mr-1"/>DNC</LinkBtn>
        }
        <Button
          color='primary'
          size='lg'
          block
          disabled={count >= campaignProspects.length}
          onClick={handleSend}
        >
          <Icon name='sendWhite' margin='mr-1 mb-1' />
          Send
        </Button>
      </ButtonSection>
    </>
  );
}

export default ReviewSend;
