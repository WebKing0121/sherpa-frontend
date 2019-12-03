import React, { useState } from 'react';
import styled from 'styled-components';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Icon from './Icon';

const StyledNavLink = styled(NavLink)`
  padding: 0 !important;
  padding-bottom: .75em !important;
  color: var(--white) !important;
  position: relative;

  &:after,
  &:before {
    transition: border-bottom-width .25s, border-top-width .25s;
    content: '';
    position: absolute;
    z-index: 999;
    bottom: 0;
    left: 50%;
  }
  &:after {
    width: 105%;
    border-bottom: 0px solid var(--darkNavy);
    border-radius: 15px;
    transform: translate(-50%,30%);
  }
  &:before {
    height: 0;
    width: 0;
    border-right: 12px solid transparent;
    border-top: 0px solid var(--darkNavy);
    border-left: 12px solid transparent;
    transform: translate(-50%,75%);
  }

  &.active {
    font-weight: 900;

    &:after {
      border-bottom-width: 5px;
    }

    &:before {
      border-top-width: 12px;
    }
  }
`;

const StyledNav = styled(Nav)`
  justify-content: space-between;
  border: none !important;
`;

function TabNav(props) {
console.log(props.activeTab);
  return (
    <div>
      <StyledNav className="textXL mt-3" tabs>
        <NavItem>
          <StyledNavLink
            className={props.activeTab === '1' ? 'active' : '' }
            onClick={() => { props.toggleTab('1'); }}
          >
            <Icon name="sendWhite" margin="mr-1"/>Send
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink
            className={props.activeTab === '2' ? 'active' : '' }
            onClick={() => { props.toggleTab('2'); }}
          >
            <Icon name="messageTabWhite" margin="mr-1"/>Messages
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink
            className={props.activeTab === '3' ? 'active' : '' }
            onClick={() => { props.toggleTab('3'); }}
          >
            <Icon name="notesWhite" margin="mr-1"/>Notes
          </StyledNavLink>
        </NavItem>
      </StyledNav>
    </div>
  );
}

export default TabNav;
