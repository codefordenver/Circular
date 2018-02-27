import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
// import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";

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
          <Link to="/">{homeText}</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <Link to="/about">
            <NavItem eventKey={1}>Why</NavItem>
          </Link>
          <NavDropdown id="tools-dropdown" eventKey={2} title="Tools" href="#">
            <Link to="/manager-resources">
              <MenuItem eventKey={2.1}>Manager Resources</MenuItem>
            </Link>
            <Link to="/what-now">
              <MenuItem eventKey={2.2}>What Now?</MenuItem>
            </Link>
          </NavDropdown>
          <Link to="">
            <NavItem eventKey={3} href="">
              My Campaign
            </NavItem>
          </Link>
          <Link to="/who-are-we">
            <NavItem eventKey={4} href="">
              Who We Are
            </NavItem>
          </Link>
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
