import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import Icon from './Icon';
import TabNav from './TabNav';
import { history } from '../history';
import IconBg from './IconBg';
import Modal from './Modal';


const StyledHeader = styled.div`
  background: var(--tealBlueGradientFlip);
  padding: var(--ypad) var(--xpad) ${props => (props.toggleTab ? '0' : null)};

  @media (max-width: 768px) {
    margin-top: 60px;
    /* navbar icon + navlink padding + nav padding */
    margin-top: calc(31px + 5vw + 1rem);
  }

  @media (min-width: 768px) {
    padding-bottom: ${props => (props.toggleTab ? '0' : 'var(--pad4)')};
  }
`;

const BackArrow = styled(Icon)`
  height: 100%;
`;

const BackButton = styled(Button)`
  align-items: center;
`;

const BackArrowHolster = styled.div`
  display: inline-block;
  margin-right: 0.4em;

  img {
    margin-top: -3px;
  }
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: ${props => props.backbtn ? "-1rem" : null};

`;

const ActionsHolster = styled.div`
  flex-direction: column;
  align-items: flex-end;
`;

function TabbedHeader(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const back = () => {
    history.goBack();
  };

  const createFollowUp = (
    <Modal isOpen={modal} toggle={toggle} title='Create Follow-Up'>
      <div>
        <p>
          By creating a Follow-up Campaign all the prospects that have not responded to the SMS from this
          campaign will permanently moved over to the new Campaign.
        </p>
      </div>

      <Button color='primary' size='md' block className='mt-2'>
        Continue
      </Button>
      <Button color='link' size='md' block>
        Cancel
      </Button>
    </Modal>
  );

  const mainActions = props.data.actions
    ? props.data.actions.main.map((a, idx) => {
      return (
        <Button size='md' id={a.action} color={a.btnType} className='ml-1' onClick={toggle} key={idx}>
          {a.text}
        </Button>
      );
    })
    : null;

  const secondaryActions =
    props.data.actions && props.data.actions.secondary
      ? props.data.actions.secondary.map((a, idx) => {
        return (
          <Button id={a.action} className='p-0 ml-1' color='link' key={idx}>
            <IconBg
              color='darkNavy'
              textcol='sherpaTeal'
              icon={a.icon}
              width='2rem'
              height='2rem'
              size='sm'
            />
          </Button>
        );
      })
      : null;

  return (
    <StyledHeader {...props}>
      <HeaderTop backbtn={props.data.hasBackButton ? 1 : 0}>
        <div data-test='tabbed-header' style={{ width: "100%" }}>
          <div>
            {props.children}
          </div>
          {props.data.hasBackButton && (
            <BackButton data-test="prospect-details-back-button" className='text-dark textL pl-0' color='link' onClick={back}>
              <BackArrowHolster>
                <BackArrow width='auto' name='arrowDark' />
              </BackArrowHolster>
              {props.data.fromText}
            </BackButton>
          )}
        </div>

        {props.data.actions && (
          <ActionsHolster className='d-none d-md-flex'>
            <div>{mainActions ? mainActions : null}</div>
            <div className='mt-1'>{secondaryActions ? secondaryActions : null}</div>
            {createFollowUp}
          </ActionsHolster>
        )}
      </HeaderTop>

      {props.toggleTab && (
        <TabNav data={props.data.tabs} activeTab={props.activeTab} toggleTab={props.toggleTab} />
      )}
    </StyledHeader>
  );
}

export default TabbedHeader;
