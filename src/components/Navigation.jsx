import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './../App.css';
import Routes from './../routes.js';

const Navigation = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const routes = Routes.map((r, idx) => {
    return (
      <NavItem key={idx}>
        <NavLink tag={Link} to={r.path} onClick={toggleNavbar}>{r.name}</NavLink>
      </NavItem>
    )
  })

  return (
    <div>
      <Navbar>
        <NavbarBrand href="/">SHERPA</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {routes}
          </Nav>
          <hr />
          <Nav>Log Out</Nav>
        </Collapse>
      </Navbar>
    </div >
  )
}

export default Navigation;
