import React, { useState } from 'react';
import styled from 'styled-components';
import SectionHeader from '../SectionHeader';
import SettingsSection from '../SettingsSection';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledList = styled.ul`
  li {
    span {
      &:nth-child(1) {
        flex: 0 0 20%;
      }
      &:nth-child(2) {
        flex: 0 0 25%;
      }
      &:nth-child(3) {
        flex: 0 0 20%;
      }
      &:nth-child(4) {
        flex: 0 0 20%;
      }
      &:nth-child(5) {
        flex: 0 0 15%;
      }
    }
  }
`;

function UsersTab(props) {
  const checkIcon = <FontAwesomeIcon icon="check-circle" color="var(--green)" className="mr-1" />
  const plusIcon = <FontAwesomeIcon icon="plus" />
  const downIcon = <FontAwesomeIcon icon="chevron-down" size="xs" className="mr-1"/>

  // header buttons
  const usersHeaderBtn = (
    <Button color="primary" size="md" onClick={()=>{}}>
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
          </li>
          <li className="item textM mb-1">
            <span>Amy Lane</span>
            <span className="gray">amy@cedarcrestco.com</span>
            <span className="gray">(609) 312-8765</span>
            <span>Master Admin</span>
            <span>{checkIcon}Active</span>
          </li>
          <li className="item textM mb-1">
            <span>Amy Lane</span>
            <span className="gray">amy@cedarcrestco.com</span>
            <span className="gray">(609) 312-8765</span>
            <span>Master Admin</span>
            <span>{checkIcon}Active</span>
          </li>
          <li className="item textM mb-1">
            <span>Amy Lane</span>
            <span className="gray">amy@cedarcrestco.com</span>
            <span className="gray">(609) 312-8765</span>
            <span>Master Admin</span>
            <span>{checkIcon}Active</span>
          </li>
          <li className="item textM mb-1">
            <span>Amy Lane</span>
            <span className="gray">amy@cedarcrestco.com</span>
            <span className="gray">(609) 312-8765</span>
            <span>Master Admin</span>
            <span>{checkIcon}Active</span>
          </li>
        </StyledList>
      </SettingsSection>
    </>
  );
}

export default UsersTab;
