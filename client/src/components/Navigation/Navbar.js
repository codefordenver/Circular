import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import NavBarSignIn from './NavBarSignIn';

const MyCampaignNavItem = ({ signedCampaignId }) => (
  <NavItem eventKey={4} href={`/campaign/${signedCampaignId}`}>
    MY CAMPAIGN
  </NavItem>
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
    <Navbar bsStyle="remove-default" collapseOnSelect fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <Link onClick={closeMap} to="/">
            {homeText}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="/denver-learn-more">
            WHY
          </NavItem>
          <NavItem eventKey={4} href="/how-does-this-work">
            HOW IT WORKS
          </NavItem>
          <NavDropdown id="tools-dropdown" eventKey={2} title="TOOLS">
            <MenuItem eventKey={2.1} href="/manager-resources">
              Property Manager Resources
            </MenuItem>
            <MenuItem eventKey={2.2} href="/tips-for-requesting">
              Tips for Requesting
            </MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="/who-are-we">
            WHO WE ARE
          </NavItem>
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
