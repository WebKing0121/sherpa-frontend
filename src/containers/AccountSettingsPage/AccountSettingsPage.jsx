import React, { useState } from 'react';
import styled from 'styled-components';
import { Nav, NavItem, NavLink, TabContent, TabPane, } from 'reactstrap';
import Header from '../../components/Header';
import classnames from 'classnames';
import AccountInfoTab from './Tabs/AccountInfoTab';

const SettingsBody = styled.div`
  display: flex;
  flex-grow: 1;
`;

const StyledNavLink = styled(NavLink)`
  padding: 0 !important;
  margin-bottom: 2em;
  position: relative;
  font-size: 1.1rem;

  &.active {
    font-weight: 900;

    &:before {
      content: '';
      position: absolute;
      width: 3.5em;
      height: 3px;
      bottom: -5px;
      left: 0;
      background: var(--sherpaBlue);
    }
  }

  &:hover {
    font-weight: 900;
    cursor: pointer;
  }
`;

const StyledNav = styled(Nav)`
  display: flex;
  flex-direction: column;
  flex: 500px 2 4;
  background: white;
  padding: var(--ypad) var(--xpad) !important;
`;

const StyledTabContent = styled(TabContent)`
  flex: 80% 4 1;

  .tab-pane {
    padding: var(--ypad) var(--xpad);
  }
`;

function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div className="pageContent d-flex flex-column">
      <Header>Account Settings</Header>
      <SettingsBody>
        <StyledNav>
          <NavItem>
            <StyledNavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >Account Info & Settings</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >Billing & Order History</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >Users</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => { toggle('4'); }}
            >Auto Settings</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink
              className={classnames({ active: activeTab === '5' })}
              onClick={() => { toggle('5'); }}
            >Manage App Integrations</StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink
              className={classnames({ active: activeTab === '6' })}
              onClick={() => { toggle('6'); }}
            >Prospect Relay Settings</StyledNavLink>
          </NavItem>
        </StyledNav>

        <StyledTabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <AccountInfoTab />
          </TabPane>
          <TabPane tabId="2">
            Billing
          </TabPane>
          <TabPane tabId="3">
            Users
          </TabPane>
          <TabPane tabId="4">
            Auto Settings
          </TabPane>
          <TabPane tabId="5">
            Manage app integerations
          </TabPane>
          <TabPane tabId="6">
            Prospect Relay Settings
          </TabPane>
        </StyledTabContent>
      </SettingsBody>
    </div>
  );
}

export default AccountSettingsPage;
