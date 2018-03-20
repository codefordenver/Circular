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
    <Navbar bsStyle="remove-default" collapseOnSelect fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">{homeText}</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1}>
            <Link to="/denver-learn-more">Why</Link>
          </NavItem>
          <NavDropdown id="tools-dropdown" eventKey={2} title="Tools" href="#">
            <MenuItem eventKey={2.1}>
              <Link to="/manager-resources">Property Manager Resources</Link>
            </MenuItem>
            <MenuItem eventKey={2.2}>
              <Link to="/tips-for-requesting">Tips for Requesting</Link>
            </MenuItem>
          </NavDropdown>
          <NavItem eventKey={3}>
            <Link to="">My Campaign</Link>
          </NavItem>
          <NavItem eventKey={4}>
            <Link to="/who-are-we">Who Are We</Link>
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
