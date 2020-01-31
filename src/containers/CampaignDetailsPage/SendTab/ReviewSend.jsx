
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  campaignsBatchProspects,
  campaignsBatchProspectsError,
  campaignsBatchPropectsStatus
} from '../../../store/CampaignsBatchProspectsStore/selectors';
import { sendInitialSmsMessage } from '../.../../../../store/CampaignsBatchProspectsStore/actions';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import CalloutSection from './CalloutSection';
import Icon from '../../../components/Icon';
import { CSSTransition } from 'react-transition-group';
import { DataLoader } from '../../../components/LoadingData';
import { Fetching } from '../../../helpers/variables';

const LeadInfo = styled.div`
  text-align: center;
  padding: var(--pad5) var(--pad3);

  .phoneNum {
    color: var(--gray);
  }
`;

const NoResults = styled.p`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--darkGray);
  padding: var(--pad3);
  line-height: 1.3 !important;
  font-size: 20px;
  padding-top: 50%;
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
      <TransitionStyling in={show} {...transProps} key={'lead-id-' + x.id}>
        <div>
          <LeadInfo>
            <h3 className='fw-bold name'>{x.prospect.name}</h3>
            <p className='phoneNum textM'>{x.prospect.phoneDisplay}</p>
            <p className='address m-0 textL'>
              {`${x.prospect.propertyAddress}, ${x.prospect.propertyCity}, ${x.prospect.propertyState} ${x.prospect.propertyZip}`}
            </p>
          </LeadInfo>

          <PreviewText data-test='batch-prospect-message' className='textL'>
            {x.smsMsgText}
          </PreviewText>
        </div>
      </TransitionStyling>
    );
  });
}

function ReviewSend() {
  const [count, setCount] = useState(0);
  const campaignProspects = useSelector(campaignsBatchProspects);
  const batchProspectsError = useSelector(campaignsBatchProspectsError);
  const isFetching = useSelector(campaignsBatchPropectsStatus);
  const dispatch = useDispatch();

  const transProps = {};
  transProps.timeout = 70;
  transProps.classNames = 'words';
  transProps.unmountOnExit = true;

  const handleSend = () => {
    if (batchProspectsError === '') {
      setCount(count + 1);
      dispatch(sendInitialSmsMessage(campaignProspects[count]));
    }
  };

  return (
    <>
      {/* <CalloutSection /> */}

      <LeadWrapper>
        <DataLoader
          status={isFetching}
          data={campaignProspects}
          emptyResultsMessage='No more messages to send'
          renderData={() => {
            if (count === campaignProspects.length)
              return <NoResults>No more messages to send</NoResults>;
            return renderLead({ campaignProspects, transProps, count });
          }}
        />
      </LeadWrapper>

      <ButtonSection>
        {
          // <LinkBtn color="orange"><Icon name="skip" margin="mr-1"/>Skip</LinkBtn>
          // <LinkBtn color="red"><Icon name="dnc" margin="mr-1"/>DNC</LinkBtn>
        }
        <Button
          data-test='batch-send-button'
          color='primary'
          size='lg'
          block
          disabled={
            count >= campaignProspects.length || batchProspectsError !== '' || isFetching === Fetching
          }
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
