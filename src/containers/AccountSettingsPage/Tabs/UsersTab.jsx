import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import SectionHeader from '../SectionHeader';
import SettingsSection from '../SettingsSection';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { getCompanyData } from '../../../store/Auth/selectors';

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
  const checkIcon = <FontAwesomeIcon icon="check-circle" color="var(--green)" className="mr-1" />;
  const inActiveIcon = <FontAwesomeIcon icon="times-circle" color="var(--red)" className="mr-1" />;
  const plusIcon = <FontAwesomeIcon icon="plus" />;
  const downIcon = <FontAwesomeIcon icon="chevron-down" size="xs" className="mr-1" />;
  const company = useSelector(getCompanyData);
  const sortedUsers = useMemo(() => {
    const users = company.profiles.sort(
      (prof1, prof2) => prof1.user.fullName.localeCompare(prof2.user.fullName)
    );

    return users;
  }, [company.profiles]);

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
          </li>
          {sortedUsers.map((profile) => (
            <li data-test={`user-${profile.id}`} className="item textM mb-1" key={profile.id}>
              <span>{profile.user.fullName}</span>
              <span className="gray">{profile.user.email}</span>
              <span className="gray">{profile.phone || '---'}</span>
              <span>{profile.role}</span>
              {profile.user.isActive ?
                <span>{checkIcon}Active</span> : <span>{inActiveIcon}Inactive</span>}

            </li>
          ))}
        </StyledList>
      </SettingsSection>
    </>
  );
}

export default UsersTab;
