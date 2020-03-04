import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import SectionHeader from '../SectionHeader';
import SettingsSection from '../SettingsSection';
import {
  Button,
  FormGroup,
  Label,
  Input,
  DropdownItem,
  Row,
  Col
} from 'reactstrap';
import InputGroupBorder from '../../../components/InputGroupBorder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { getCompanyData } from '../../../store/Auth/selectors';
import ModalToggle from '../ModalToggle';
import Select from '../../../components/InputSelect2';

const StyledList = styled.ul`
  li {
    span {
      &:nth-child(1) {
        flex: 0 0 20%;
      }
      &:nth-child(2) {
        flex: 0 0 27%;
      }
      &:nth-child(3) {
        flex: 0 0 18%;
      }
      &:nth-child(4) {
        flex: 0 0 18%;
      }
      &:nth-child(5) {
        flex: 0 0 12%;
      }
      &:nth-child(6) {
        flex: 1 0 auto;
        text-align: right;
      }
    }
  }
  svg.editBtn {
    &:hover {
      cursor: pointer;
      color: var(--sherpaBlue);
    }
  }
  svg.editBtn {
    &:hover {
      cursor: pointer;
      color: var(--sherpaBlue);
    }
  }
`;

const roleOpts = (
  <>
    <DropdownItem>1</DropdownItem>
    <DropdownItem>2</DropdownItem>
    <DropdownItem>3</DropdownItem>
    <DropdownItem>4</DropdownItem>
    <DropdownItem>5</DropdownItem>
  </>
);

const statusOpts = (
  <>
    <DropdownItem>1</DropdownItem>
    <DropdownItem>2</DropdownItem>
    <DropdownItem>3</DropdownItem>
    <DropdownItem>4</DropdownItem>
    <DropdownItem>5</DropdownItem>
  </>
);

// modals
const editModal = (
  <form>
    <Row form>
      <Col xs="12" md="6">
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <InputGroupBorder>
            <Input placeholder="Enter user's first name" type="text" name="firstName" />
          </InputGroupBorder>
        </FormGroup>
      </Col>
      <Col xs="12" md="6">
        <FormGroup>
          <Label htmlFor="lastname">Last Name</Label>
          <InputGroupBorder>
            <Input placeholder="Enter user's last name" type="text" name="lastname" />
          </InputGroupBorder>
        </FormGroup>
      </Col>
    </Row>
    <Row form>
      <Col xs="12" md="6">
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <InputGroupBorder>
            <Input placeholder="Enter user's email" type="email" name="email" />
          </InputGroupBorder>
        </FormGroup>
      </Col>
      <Col xs="12" md="6">
        <FormGroup>
          <Label htmlFor="mobile">Mobile</Label>
          <InputGroupBorder>
            <Input placeholder="Enter user's Mobile Number" type="tel" name="mobile" />
          </InputGroupBorder>
        </FormGroup>
      </Col>
    </Row>
    <Row form>
      <Col xs="12" md="6">
        <FormGroup>
          <Label htmlFor="role">Role</Label>
          <Select placeholder="Enter user's role" options={roleOpts} />
        </FormGroup>
      </Col>
      <Col xs="12" md="6">
        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <Select placeholder="Enter user's status" options={statusOpts} />
        </FormGroup>
      </Col>
    </Row>
  </form>
);

// modal configs
const editConfig = {
  title: "Edit Profile",
  btnTxt: "Save",
  inner: editModal,
  onSubmit: () => { console.log("submitted modal") }
};

function UsersTab(props) {
  const checkIcon = <FontAwesomeIcon icon="check-circle" color="var(--green)" className="mr-1" />;
  const inActiveIcon = <FontAwesomeIcon icon="times-circle" color="var(--red)" className="mr-1" />;
  const company = useSelector(getCompanyData);
  const sortedUsers = useMemo(() => {
    const users = company.profiles.sort(
      (prof1, prof2) => prof1.user.fullName.localeCompare(prof2.user.fullName)
    );

    return users;
  }, [company.profiles]);
  const plusIcon = <FontAwesomeIcon icon="plus" />;
  const downIcon = <FontAwesomeIcon icon="chevron-down" size="xs" className="mr-1"/>;
  const editIcon = (
    <ModalToggle config={editConfig} >
      <FontAwesomeIcon
        className="editBtn" icon="pencil-alt" size="md" color="var(--green)" />
    </ModalToggle>
  );

  // header buttons
  const usersHeaderBtn = (
    <Button color="primary" size="md" onClick={() => { }}>
      {plusIcon}
      Add New User
    </Button>
  );

  // header components
  const usersHeader = (
    <SectionHeader
      title="Users"
      btn={usersHeaderBtn}
    />
  );

  return (
    <>
      <SettingsSection type="table" header={usersHeader}>
        <StyledList>
          <li className="item header textM mb-1">
            <span>{downIcon} A to Z</span>
            <span></span>
            <span></span>
            <span>{downIcon} Role</span>
            <span>{downIcon} Status</span>
            <span></span>
          </li>
          {sortedUsers.map((profile) => (
            <li data-test={`user-${profile.id}`} className="item textM mb-1" key={profile.id}>
              <span>{profile.user.fullName}</span>
              <span className="gray">{profile.user.email}</span>
              <span className="gray">{profile.phone || '---'}</span>
              <span>{profile.role}</span>
              {profile.user.isActive ?
                <span>{checkIcon}Active</span> : <span>{inActiveIcon}Inactive</span>}
		<span>{editIcon}</span>
            </li>
          ))}
        </StyledList>
      </SettingsSection>
    </>
  );
}

export default UsersTab;
