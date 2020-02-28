import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { activeMarkets } from '../../../store/Markets/selectors';
import { fetchMarkets } from '../../../store/Markets/actions';
import Modal from '../../../components/Modal';
import UpdatePasswordModal from './UpdatePasswordModal';
import SectionHeader from '../SectionHeader';
import ModalToggle from "../ModalToggle";
import SettingsSection from '../SettingsSection';
import InputGroupBorder from '../../../components/InputGroupBorder';
import { Form, Label, Input, FormGroup, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import MarketSection from './AccountInfoTabSections/MarketSection';

const MarketModalWrapper = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
`;

const SlideIn = styled(CSSTransition)`
  --timing: .2s ease-in-out;
  --left: 0%;
  position: relative;
  overflow: hidden;
  transition: left var(--timing);
  left: var(--left);
  flex: 0 0 100%;

  &.slide {
    &-enter {
      left: 110%;
      &-active {
        left: 110%;
      }
      &-done {
        left: var(--left);
      }
    }
    &-exit {
      left: var(--left);
      &-active {
        left: -110%;
      }
    }
  }
`;

function AccountInfoTab(props) {
  // local state
  const [showPhase1, setShowPhase1] = useState(true);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  //modal toggles
  const passModalToggle = () => setPasswordModalOpen(state => !state);

  // modal configs init
  let newMarketConfig = {};

  // selectors
  const markets = useSelector(activeMarkets);

  const plusIcon = <FontAwesomeIcon icon="plus-circle" />;
  const dispatch = useDispatch();
 
  // fetch markets if not already in the store
  useEffect(() => {
    if (markets.length === 0) {
      dispatch(fetchMarkets());
    }
  }, []);

  const marketModal = (
    <MarketModalWrapper>
      <SlideIn
        in={showPhase1}
        timeout={300}
        appear={true}
        classNames="slide"
        unmountOnExit={true}>
        <div className="phase1">
          <FormGroup>
            <Label htmlFor="state">State</Label>
            <InputGroupBorder>
              <Input name="state" placeholder="Enter State" />
            </InputGroupBorder>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="market">Market</Label>
            <InputGroupBorder>
              <Input name="market" placeholder="Enter Market" />
            </InputGroupBorder>
          </FormGroup>
          <Button className="mt-3" color="primary" size="lg" block onClick={() => setShowPhase1(!setShowPhase1)}>
            Next
          </Button>
        </div>
      </SlideIn>

      <SlideIn
        in={!showPhase1}
        timeout={300}
        appear={false}
        classNames="slide"
        unmountOnExit={true}>
        <div className="phase2">
          <FormGroup>
            <Label htmlFor="marketName">Market Name</Label>
            <InputGroupBorder>
              <Input name="marketName" placeholder="Enter Market Name" />
            </InputGroupBorder>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="number">Call Forwarding Number</Label>
            <InputGroupBorder>
              <Input name="number" placeholder="Enter Call Forwarding Number" />
            </InputGroupBorder>
          </FormGroup>
          <Button className="mt-3" color="primary" size="lg" block onClick={() => { }}>
            Create Market
          </Button>
        </div>
      </SlideIn>
    </MarketModalWrapper>
  );

   newMarketConfig = {
    title: "New Market",
    inner: marketModal,
  };

  // header buttons
  const accountHeaderBtns = (
    <div className="d-flex align-items-end">
      <Button onClick={passModalToggle} className="mr-2" color="secondary" data-test='change-password-btn' size="md">Change Password</Button>
        <Modal dataTest="change-password-modal" title="Change Password" isOpen={passwordModalOpen} toggle={passModalToggle}>
          <UpdatePasswordModal toggle={passModalToggle} />
        </Modal>
      <Button color="primary" size="md" onClick={() => { }}>
        Save Changes
      </Button>
    </div>
  );

  const marketsHeaderBtns = (
    <ModalToggle config={newMarketConfig}>
      <Button color="primary" size="md" onClick={() => { }}>
        {plusIcon}New Market
      </Button>
    </ModalToggle>
  );

  // header components
  const accountHeader = (
    <SectionHeader
      title="Account Information"
      btns={accountHeaderBtns}
    />
  );

  const marketsHeader = (
    <SectionHeader
      title="Markets"
      btns={marketsHeaderBtns}
    />
  );

  return (
    <>
      <SettingsSection type="form" header={accountHeader}>
        <Form>
          <Row form>
            <Col md={5}>
              <FormGroup>
                <Label>Business Name</Label>
                <InputGroupBorder>
                  <Input placeholder="Enter Business Name" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Email</Label>
                <InputGroupBorder>
                  <Input placeholder="Enter Your Email" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>Time Zone</Label>
                <InputGroupBorder>
                  <Input placeholder="Enter Your Time Zone" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </SettingsSection>

      <SettingsSection type="list" header={marketsHeader}>
        <MarketSection />
      </SettingsSection>
    </>
  );
}

export default AccountInfoTab;
