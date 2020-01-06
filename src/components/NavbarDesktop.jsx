import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import sherpaIcon from '../assets/images/sherpaIcon.png';
import sherpaLogo from '../assets/images/sherpaLogo.png';
import { Link } from 'react-router-dom';
import Routes from './../routes.ts';
import Icon from './Icon.jsx';
import { CSSTransition } from 'react-transition-group';
import { path } from '../store/Nav/selectors';
import { setPath } from '../store/Nav/actions';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { logout } from '../store/Auth/actions';

const SlideIn = styled(CSSTransition)`
  --timing: .3s;
  --width: calc(2rem + 7vw);
  position: relative;
  overflow: hidden;
  transition: width var(--timing);
  display: none;

  &.slide {
    &-appear {
      display: block;
      &-active {display: block;}
      &-done {display: block;}
    }
    &-enter {
      width: 0px;
      &-active {
        width: var(--width);
        display: block;
      }
      &-done {
        width: var(--width);
        display: block;
      }
    }
    &-exit {
      position: absolute;
      width: var(--width);
      &-active {width: 0px;}
      &-done {display: none}
    }
  }
`;
const LogoSlide = styled(SlideIn)`
  --width: ${props => props.width};
  max-width: 100%;
`;
const StyledNavbar = styled(Navbar)`
  box-shadow: 0 0 36px -4px #00000091, 0 0 5px -1px #0000008c;
  min-height: 100vh;
  left: 0;
  flex-basis: ${props =>
    props.isOpen ? "300px" : "100px"};
  flex-basis: ${props =>
    props.isOpen ? "calc(4rem + 14vw)" : "calc(4rem + 4vw)"};
  flex-shrink: 0;
  flex-grow: 0;
  padding: 0 !important;
  flex-flow: column nowrap !important;
  z-index: 999;
  transition: flex-basis .3s;

  @media (min-width: 1800px) {
    flex-basis: ${props => props.isOpen ? "calc(4rem + 252px)" : "calc(4rem + 72px)"};
  }

  .navbar-brand {
    flex-grow: 0;
    margin: 0 !important;
    padding: 2rem !important;
  }
`;

const StyledNav = styled(Nav)`
  border-top: 1px solid var(--charcoal);
  align-items: center;
  flex-grow: 1;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  width: 100%;
`;
const LogoutNav = styled(StyledNav)`
  justify-content: flex-end;
  margin-bottom: 1rem !important;
`;

const StyledNavItem = styled(NavItem)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-left: 4px solid transparent;
  padding: var(--pad1) var(--pad3);
  position: relative;
  width: 100%;

  &:active,
  &:hover {
    background: rgba(0, 0, 0, 0.25);
    border-left-color: rgba(0, 0, 0, 0.25);
  }
  &.active {
    background: rgba(0, 0, 0, 0.6);
    border-left-color: var(--sherpaBlue);
  }
  &:not(.active) img,
  &:not(.active) span {
    opacity: .4;
  }

  img {
    max-width: 3vw;
  }
`;

const ArrowBtnHolster = styled.div`
  position: absolute;
  /* padding and size of logo so it lines up with logo */
  top: calc(2rem + (34px / 2));
  right: 0;
  width: calc(.8rem + 2.2vw);
  height: calc(.8rem + 2.2vw);
  display: flex;
  transition: transform 0.15s;
  transform-origin: center center;
  transform: ${props =>
    (props.isOpen ? 'translate(50%,-50%) rotate(270deg)' : 'translate(50%,-50%) rotate(-90deg)')};
  align-items: center;
  justify-content: center;
  z-index: 99;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: var(--darkNavy);
    border-radius: 50%;
    z-index: -1;
  }

  img {
    width: calc(6px + 1vw);
    transition: transform 0.3s;
    transform: rotate(${props => (props.isOpen ? '0deg' : '180deg')});
  }

  @media (min-width: 1700px) {
    width: calc(.8rem + 37.4px);
    height: calc(.8rem + 37.4px);

    img {
      width: calc(6px + 17px);
    }
  }
`;

const NavArrow = props => {
  return (
    <ArrowBtnHolster isOpen={props.isOpen} onClick={props.onClick} data-test='navbar-arrow'>
      <Icon name='arrowWhite' width='15px' />
    </ArrowBtnHolster>
  );
};

const NavbarDesktop = props => {
  const [collapse, setCollapse] = useState(false);
  const pageName = useSelector(path);
  const toggleNavbar = () => setCollapse(!collapse);
  const closeNavbar = () => setCollapse(false);

  const routes = Routes.map((r, idx) => {
    let activeClass = props.page.location.pathname === r.path ? 'active' : '';
    let textClass = collapse ? "d-flex align-items-center textL" : "d-none";
    let linkClass = "navLink textL stretched-link" + (collapse ?  " w-100 d-flex" : "") ;
    let iconClass = collapse ? "mr-1" : "";

    return (
      <StyledNavItem className={activeClass} key={idx} onClick={() => dispatch(setPath(r.path))}>
        <NavLink className={linkClass} tag={Link} to={r.path} >
          <Icon margin={iconClass} name={r.navIcon} width='30' />
          <SlideIn
            in={collapse}
            timeout={300}
            appear={true}
            className={textClass}
            classNames="slide">
            <span>{r.name}</span>
          </SlideIn>
        </NavLink>
      </StyledNavItem>
    );
  });

  const dispatch = useDispatch();

  return (
    <StyledNavbar isOpen={collapse} vertical color='dark' dark expand='md' data-test='navbar'>
      <NavbarBrand tag='div' data-test='navbar-brand'>
        <Link to='/'>
          <LogoSlide
            in={collapse}
            timeout={300}
            appear={true}
            width="160px"
            classNames="slide">
            <img src={sherpaLogo} alt='Lead Sherpa' />
          </LogoSlide>
          <LogoSlide
            in={!collapse}
            timeout={300}
            appear={true}
            width="35px"
            classNames="slide">
            <img src={sherpaIcon} alt='Lead Sherpa' />
          </LogoSlide>
        </Link>
      </NavbarBrand>

      <NavArrow isOpen={collapse} className='arrow' onClick={toggleNavbar} />

      <StyledNav vertical navbar data-test='routes'>
        {routes}
      </StyledNav>

      <LogoutNav vertical navbar className>
        <NavItem>
          <NavLink
            onClick={() => dispatch(logout())}
            className='navLink textL'
            data-test='logout-link'
          >
            Log out
          </NavLink>
        </NavItem>
      </LogoutNav>
    </StyledNavbar>
  );
};

export default NavbarDesktop;
