import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';

const NavBar = props => {
  let homeText;
  if (props.location.pathname === '/') {
    homeText = 'RE:IMAGINE DENVER';
  } else {
    homeText = 'HOME';
  }

  return (
    <Navbar bsStyle="remove-default" collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="./containers/Home">{homeText}</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            Why
          </NavItem>
          <NavDropdown eventKey={2} title="Tools" href="#">
            <MenuItem eventKey={3.1}>Manager Resources</MenuItem>
            <MenuItem eventKey={3.2}>What Now?</MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="">
            My Campaign
          </NavItem>
          <NavItem eventKey={4} href="">
            Who We Are
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavBar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default NavBar;
