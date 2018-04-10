import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logSignerOut } from '../redux/actions/signature';

const UserIsLoggedIn = props => {
  const { auth: { name } } = props;
  const logOutUser = props.logSignerOut;
  const firstName = name.substr(0, name.indexOf(' '));
  return (
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1}>
          <Link to="/denver-learn-more">Why</Link>
        </NavItem>
        <NavDropdown id="tools-dropdown" eventKey={2} title="Tools">
          <MenuItem eventKey={2.1}>
            <Link to="/manager-resources">Property Manager Resources</Link>
          </MenuItem>
          <MenuItem eventKey={2.2}>
            <Link to="/tips-for-requesting">Tips for Requesting</Link>
          </MenuItem>
        </NavDropdown>
        <NavItem eventKey={3}>
          <Link to="/who-are-we">Who Are We</Link>
        </NavItem>
        <NavItem eventKey={4}>
          <Link to="">My Campaign</Link>
        </NavItem>
        <NavItem eventKey={4} onClick={logOutUser}>
          Sign Out, {firstName}
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  );
};

function UserIsNotLoggedIn(props) {
  return (
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1}>
          <Link to="/denver-learn-more">Why</Link>
        </NavItem>
        <NavDropdown id="tools-dropdown" eventKey={2} title="Tools">
          <MenuItem eventKey={2.1}>
            <Link to="/manager-resources">Property Manager Resources</Link>
          </MenuItem>
          <MenuItem eventKey={2.2}>
            <Link to="/tips-for-requesting">Tips for Requesting</Link>
          </MenuItem>
        </NavDropdown>
        <NavItem eventKey={3}>
          <Link to="/who-are-we">Who Are We</Link>
        </NavItem>
        <NavDropdown id="tools-dropdown" eventKey={4} title="Login">
          <MenuItem eventKey={4.1} href="/auth/facebook">
            Sign in With Facebook
          </MenuItem>
          <MenuItem eventKey={4.2} href="/auth/google">
            Sign in With Google
          </MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  );
}

const UserNavItem = props => {
  // checks if user is not currently authed with google or facebook
  if (props.auth && (!props.auth.googleID && !props.auth.facebookID)) {
    return <UserIsNotLoggedIn {...props} />;
  }
  return <UserIsLoggedIn {...props} />;
};

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
      <UserNavItem {...props} />
    </Navbar>
  );
};

UserIsLoggedIn.propTypes = {
  logSignerOut: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};

UserNavItem.propTypes = {
  auth: PropTypes.shape({
    googleID: PropTypes.string,
    facebookID: PropTypes.string
  }).isRequired
};

NavBar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default connect(({ auth }) => ({ auth }), {
  logSignerOut
})(NavBar);
