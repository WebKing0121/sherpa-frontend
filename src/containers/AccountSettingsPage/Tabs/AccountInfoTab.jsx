import React, { useState } from 'react';
import styled from 'styled-components';
import SectionHeader from '../SectionHeader';
import Modal from '../../../components/Modal';
import ModalToggle from "../ModalToggle";
import SettingsSection from '../SettingsSection';
import InputGroupBorder from '../../../components/InputGroupBorder';
import { Form, Label, Input, FormGroup, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AccountInfoTab(props) {
  const plusIcon = <FontAwesomeIcon icon="plus-circle"/>
  const editIcon = <FontAwesomeIcon icon="pencil-alt" color="var(--green)" className="ml-1"/>
  const checkIcon = <FontAwesomeIcon icon="check-circle" color="var(--green)" className="mr-1"/>

  // modals
  const passwordModal = (
    <>
      <FormGroup>
        <Label for="password">Password</Label>
        <InputGroupBorder>
          <Input placeholder="Enter your password" type="password" name="password"/>
        </InputGroupBorder>
      </FormGroup>
      <FormGroup>
        <Label for="confirmPassword">Confirm Password</Label>
        <InputGroupBorder>
          <Input placeholder="Enter your password" type="password" name="confirmPassword"/>
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
    onSubmit: ()=>{console.log("submitted modal")}
  };

  const forwardNumModalConfig = {
    title: "Edit Forwarding Number",
    btnTxt: "Confirm",
    inner: forwardNumModal,
    onSubmit: ()=>{console.log("submitted modal")}
  };

  const newMarketConfig = {
    title: "New Market",
    btnTxt: "Create",
    inner: marketModal,
    onSubmit: ()=>{console.log("submitted modal")}
  };

  // header buttons
  const accountHeaderBtn = (
    <Button color="primary" size="md" onClick={()=>{}}>
      Save Changes
    </Button>
  );

  const marketsHeaderBtn = (
    <ModalToggle config={newMarketConfig}>
      <Button color="primary" size="md" onClick={()=>{}}>
        {plusIcon}New Market
      </Button>
    </ModalToggle>
  );

// header components
  const accountHeader = (
    <SectionHeader
      title="Account Information"
      btn={accountHeaderBtn}
    />
  );

  const marketsHeader = (
    <SectionHeader
      title="Markets"
      btn={marketsHeaderBtn}
    />
  );

  return (
    <>
      <SettingsSection type="form" header={accountHeader}>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>Business Name</Label>
                <InputGroupBorder>
                  <Input placeholder="Name Your Template" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Email</Label>
                <InputGroupBorder>
                  <Input placeholder="Name Your Template" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>Time Zone</Label>
                <InputGroupBorder>
                  <Input placeholder="Name Your Template" />
                </InputGroupBorder>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Password</Label>
                <ModalToggle config={changePassConfig}>
                  <Button className="mt-3" color="secondary" size="sm" block>Change Password</Button>
                </ModalToggle>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </SettingsSection>

      <SettingsSection type="list" header={marketsHeader}>
        <ul className="p-0">
          <li className="item textM mb-1">
            <span>Denver Metro</span>
            <span className="gray">
              Forwarding to
              <span className="ml-1 darkGray fw-bold">(605)215-9699</span>
              <ModalToggle config={forwardNumModalConfig}>{editIcon}</ModalToggle>
            </span>
            <span>{checkIcon}Active</span>
          </li>
          <li className="item textM mb-1">
            <span>Pueblo/Springs</span>
            <span className="gray">
              Forwarding to
              <span className="ml-1 darkGray fw-bold">(605)215-9699</span>
              <ModalToggle config={forwardNumModalConfig}>{editIcon}</ModalToggle>
            </span>
            <span>{checkIcon}Active</span>
          </li>
          <li className="item textM mb-1">
            <span>Pueblo/Springs</span>
            <span className="gray">
              Forwarding to
              <span className="ml-1 darkGray fw-bold">(605)215-9699</span>
              <ModalToggle config={forwardNumModalConfig}>{editIcon}</ModalToggle>
            </span>
            <span>{checkIcon}Active</span>
          </li>
        </ul>
      </SettingsSection>
    </>
  );
}

export default AccountInfoTab;
