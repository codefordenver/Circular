import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import NavBarSignIn from './NavBarSignIn';

// Wrap all Bootstrap Links (eg. MenuItem, NavItem) in LinkContainer to use React-Router
// (No need to wrap react-router's <Link> components)

const MyCampaignNavItem = ({ signedCampaignId }) => (
  <LinkContainer to={`/campaign/${signedCampaignId}`}>
    <NavItem eventKey={4}>MY CAMPAIGN</NavItem>
  </LinkContainer>
);

const NavBar = ({
  auth,
  auth: { signedCampaignId },
  closeMap,
  firebaseSignOut,
  firebaseSignInGoogle,
  firebaseSignInFacebook,
  userSignatures,
  ...props
}) => {
  const userHasSignedCampaign = auth.status === 'SIGNED_IN' && signedCampaignId !== null;
  const showMyCampaignNavItem =
    `/campaign/${signedCampaignId}` !== props.location.pathname && userHasSignedCampaign;
  let homeText;
  homeText =
    props.location.pathname === '/' ? (homeText = 'RE:IMAGINE DENVER') : (homeText = 'HOME');
  return (
    <Navbar bsStyle="remove-default" collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/" onClick={closeMap}>
            {homeText}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <LinkContainer to="/denver-learn-more">
            <NavItem eventKey={1}>WHY</NavItem>
          </LinkContainer>
          <LinkContainer to="/how-does-this-work">
            <NavItem eventKey={4}>HOW IT WORKS</NavItem>
          </LinkContainer>
          <NavDropdown id="tools-dropdown" eventKey={2} title="TOOLS">
            <LinkContainer to="/manager-resources">
              <MenuItem eventKey={2.1}>Property Manager Resources</MenuItem>
            </LinkContainer>
            <LinkContainer to="/tips-for-requesting">
              <MenuItem eventKey={2.2}>Tools for Tenants</MenuItem>
            </LinkContainer>
          </NavDropdown>
          <LinkContainer to="/who-are-we">
            <NavItem eventKey={3}>WHO WE ARE</NavItem>
          </LinkContainer>
          {/*  RENDERS MyCampaignNavItem BASED ON AUTH STATUS and location */}
          {showMyCampaignNavItem && <MyCampaignNavItem signedCampaignId={signedCampaignId} />}
          {auth.status && (
            <NavBarSignIn
              auth={auth}
              firebaseSignOut={firebaseSignOut}
              firebaseSignInGoogle={firebaseSignInGoogle}
              firebaseSignInFacebook={firebaseSignInFacebook}
            />
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

MyCampaignNavItem.defaultProps = {
  signedCampaignId: null
};

MyCampaignNavItem.propTypes = {
  signedCampaignId: PropTypes.string
};

NavBar.defaultProps = {
  signedCampaignId: null
};

NavBar.propTypes = {
  auth: PropTypes.shape({
    signedCampaignId: PropTypes.string,
    status: PropTypes.string.isRequired
  }).isRequired,
  closeMap: PropTypes.func.isRequired,
  firebaseSignInGoogle: PropTypes.func.isRequired,
  firebaseSignInFacebook: PropTypes.func.isRequired,
  firebaseSignOut: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  userSignatures: PropTypes.shape({}).isRequired
};

export default NavBar;
