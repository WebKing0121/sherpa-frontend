import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/images/sherpaLogo.png';
import { Link } from 'react-router-dom';
import Routes from './../routes.js';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const StyledNavbar = styled(Navbar)`
`;

const SherpNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => setIsOpen(!isOpen);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const routes = Routes.map((r, idx) => {
    return (
      <NavItem key={idx}>
        <img src={r.navIcon} alt={r.alt}/>
        <NavLink tag={Link} to={r.path} onClick={toggleNavbar}>{r.name}</NavLink>
      </NavItem>
    )
  })

  return (
    <div>
      <StyledNavbar color="dark" dark expand="md">
        <NavbarBrand href="/"><img src={logo} alt="Lead Sherpa"/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          {routes}
        </Nav>
        </Collapse>
      </StyledNavbar>
    </div>
  );
}

export default SherpNavbar;
