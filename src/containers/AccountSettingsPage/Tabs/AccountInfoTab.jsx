import React, { useEffect } from 'react';
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
    <FormGroup>
      <InputGroupBorder>
        <Input placeholder="Enter Market Name" />
      </InputGroupBorder>
    </FormGroup>
  );

  // modal configs
  const changePassConfig = {
    title: "Change Password",
    btnTxt: "Confirm",
    inner: passwordModal,
    onSubmit: () => { console.log("submitted modal") }
  };

  const forwardNumModalConfig = {
    title: "Edit Forwarding Number",
    btnTxt: "Confirm",
    inner: forwardNumModal,
    onSubmit: () => { console.log("submitted modal") }
  };

  const newMarketConfig = {
    title: "New Market",
    btnTxt: "Create",
    inner: marketModal,
    onSubmit: () => { console.log("submitted modal") }
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
