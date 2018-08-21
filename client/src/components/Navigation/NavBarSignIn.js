import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router';

const NavBarSignIn = ({
  auth,
  firebaseSignOut,
  firebaseSignInFacebook,
  firebaseSignInGoogle,
  location
}) =>
  (auth.status === 'SIGNED_IN' ? (
    <NavItem eventKey={5} onClick={firebaseSignOut}>
      SIGN OUT, {auth.displayName.toUpperCase()}
    </NavItem>
  ) : (
    <NavDropdown id="tools-dropdown" eventKey={5} title="LOGIN">
      <LinkContainer to={location.pathname} onClick={firebaseSignInFacebook}>
        <MenuItem eventKey={5.1} href="/auth/facebook">
          Sign in With Facebook
        </MenuItem>
      </LinkContainer>
      <LinkContainer to={location.pathname} onClick={firebaseSignInGoogle}>
        <MenuItem eventKey={5.2} href="/auth/google">
          Sign in With Google
        </MenuItem>
      </LinkContainer>
    </NavDropdown>
  ));

NavBarSignIn.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  firebaseSignOut: PropTypes.func.isRequired,
  firebaseSignInFacebook: PropTypes.func.isRequired,
  firebaseSignInGoogle: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired
};

export default withRouter(NavBarSignIn);
