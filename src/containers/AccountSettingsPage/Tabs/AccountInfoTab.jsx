import React, { useEffect, useState } from 'react';
import SectionHeader from '../SectionHeader';
import ModalToggle from "../ModalToggle";
import SettingsSection from '../SettingsSection';
import InputGroupBorder from '../../../components/InputGroupBorder';
import { Form, Label, Input, FormGroup, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { activeMarkets, marketsStatus } from '../../../store/Markets/selectors';
import { fetchMarkets } from '../../../store/Markets/actions';
import { DataLoader } from '../../../components/LoadingData';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

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
  const markets = useSelector(activeMarkets);
  const isLoading = useSelector(marketsStatus);
  const plusIcon = <FontAwesomeIcon icon="plus-circle" />;
  const editIcon = <FontAwesomeIcon icon="pencil-alt" color="var(--green)" className="ml-1" />;
  const checkIcon = <FontAwesomeIcon icon="check-circle" color="var(--green)" className="mr-1" />;
  const dispatch = useDispatch();

  // fetch markets if not already in the store
  useEffect(() => {
    if (markets.length === 0) {
      dispatch(fetchMarkets());
    }
  }, []);

  const [showPhase1, setShowPhase1] = useState(true);

  // modal configs init
  let changePassConfig = {};
  let forwardNumModalConfig = {};
  let newMarketConfig = {};

  // modals
  const passwordModal = (
    <>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <InputGroupBorder>
          <Input placeholder="Enter your password" type="password" name="password" />
        </InputGroupBorder>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <InputGroupBorder>
          <Input placeholder="Enter your password" type="password" name="confirmPassword" />
        </InputGroupBorder>
      </FormGroup>
    </>
  );

  const forwardNumModal = (
    <FormGroup>
      <InputGroupBorder>
        <Input placeholder="Enter Forwarding Number" />
      </InputGroupBorder>
    </FormGroup>
  );

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
            <Label for="state">State</Label>
            <InputGroupBorder>
              <Input name="state" placeholder="Enter State" />
            </InputGroupBorder>
          </FormGroup>
          <FormGroup>
            <Label for="market">Market</Label>
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
            <Label for="marketName">Market Name</Label>
            <InputGroupBorder>
              <Input name="marketName" placeholder="Enter Market Name" />
            </InputGroupBorder>
          </FormGroup>
          <FormGroup>
            <Label for="number">Call Forwarding Number</Label>
            <InputGroupBorder>
              <Input name="number" placeholder="Enter Call Forwarding Number" />
            </InputGroupBorder>
          </FormGroup>
          <Button className="mt-3" color="primary" size="lg" block onClick={()=>{}}>
            Create Market
          </Button>
        </div>
      </SlideIn>
    </MarketModalWrapper>
  );

  // modal configs
  changePassConfig = {
    title: "Change Password",
    btnTxt: "Confirm",
    inner: passwordModal,
    onSubmit: () => { console.log("submitted modal") }
  };

  forwardNumModalConfig = {
    title: "Edit Forwarding Number",
    btnTxt: "Confirm",
    inner: forwardNumModal,
    onSubmit: () => { console.log("submitted modal") }
  };

  newMarketConfig = {
    title: "New Market",
    inner: marketModal,
  };

  // header buttons
  const accountHeaderBtns = (
    <div className="d-flex align-items-end">
      <ModalToggle config={changePassConfig}>
        <Button className="mr-2" color="secondary" size="md">Change Password</Button>
      </ModalToggle>
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
        <DataLoader
          emptyResultsMessage="You do not have any active markets"
          data={markets}
          status={isLoading}
          renderData={() => (
            <ul data-test="acount-info-markets-list" className="p-0">
              {markets.map(market => (
                <li key={market.id} className="item textM mb-1">
                  <span>{market.name}</span>
                  <span className="gray">
                    Forwarding to
                    <span className="ml-1 darkGray fw-bold">{market.callForwardingNumber}</span>
                    <ModalToggle config={forwardNumModalConfig}>{editIcon}</ModalToggle>
                  </span>
                  <span>{checkIcon}Active</span>
                </li>
              ))}
            </ul>
          )}
          dataTest="account-info-market-data-loader"
        />
      </SettingsSection>
    </>
  );
}

export default AccountInfoTab;
