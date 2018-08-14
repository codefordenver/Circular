import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const NavBarSignIn = ({ auth, firebaseSignOut, firebaseSignInGoogle, firebaseSignInFacebook }) =>
  (auth.status === 'SIGNED_IN' ? (
    <NavItem eventKey={5} onClick={firebaseSignOut}>
      SIGN OUT, {auth.displayName.toUpperCase()}
    </NavItem>
  ) : (
    <NavDropdown id="tools-dropdown" eventKey={5} title="LOGIN">
      <MenuItem eventKey={5.1} onClick={firebaseSignInFacebook}>
        Sign in With Facebook
      </MenuItem>
      <MenuItem eventKey={5.2} onClick={firebaseSignInGoogle}>
        Sign in With Google
      </MenuItem>
    </NavDropdown>
  ));

NavBarSignIn.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  firebaseSignOut: PropTypes.func.isRequired,
  firebaseSignInGoogle: PropTypes.func.isRequired,
  firebaseSignInFacebook: PropTypes.func.isRequired
};

export default NavBarSignIn;
