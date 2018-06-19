import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const NavBarSignIn = ({ auth, signOut, signInGoogle, signInFacebook }) => {
  const { displayName } = auth;
  //   const endOfFirstName =
  //     displayName !== null && displayName.indexOf(' ') > -1
  //       ? displayName.indexOf(' ')
  //       : displayName.length;
  //   const firstName = displayName.substr(0, endOfFirstName);
  return auth.status === 'SIGNED_IN' ? (
    <NavItem eventKey={5} onClick={signOut}>
      Sign Out, {displayName}
    </NavItem>
  ) : (
    <NavDropdown id="tools-dropdown" eventKey={5} title="Login">
      <MenuItem eventKey={5.1} onClick={signInFacebook}>
        Sign in With Facebook
      </MenuItem>
      <MenuItem eventKey={5.2} onClick={signInGoogle}>
        Sign in With Google
      </MenuItem>
    </NavDropdown>
  );
};

NavBarSignIn.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  signOut: PropTypes.func.isRequired,
  signInGoogle: PropTypes.func.isRequired,
  signInFacebook: PropTypes.func.isRequired
};

export default NavBarSignIn;
