import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import NavBarSignIn from './NavBarSignIn';

const MyCampaignNavItem = ({ campaignId }) => (
  <NavItem eventKey={4} href={`/campaign/${campaignId}`}>
    My Campaign
  </NavItem>
);

const NavBar = ({
  auth,
  firebaseSignOut,
  firebaseSignInGoogle,
  firebaseSignInFacebook,
  userSignatures,
  ...props
}) => {
  const { _campaignID } = userSignatures;
  const userHasSignedCampaign = auth.status === 'SIGNED_IN' && _campaignID;
  let homeText;
  homeText =
    props.location.pathname === '/' ? (homeText = 'RE:IMAGINE DENVER') : (homeText = 'HOME');
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
          <NavItem eventKey={1} href="/denver-learn-more">
            Why Recycle
          </NavItem>
          <NavDropdown id="tools-dropdown" eventKey={2} title="Tools">
            <MenuItem eventKey={2.1} href="/manager-resources">
              Property Manager Resources
            </MenuItem>
            <MenuItem eventKey={2.2} href="/tips-for-requesting">
              Tips for Requesting
            </MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="/who-are-we">
            Who Are We
          </NavItem>
          {/*  RENDERS MyCampaignNavItem BASED ON AUTH STATUS */}
          {userHasSignedCampaign && <MyCampaignNavItem campaignId={_campaignID} />}
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
  campaignId: null
};

MyCampaignNavItem.propTypes = {
  campaignId: PropTypes.string
};

NavBar.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  firebaseSignInGoogle: PropTypes.func.isRequired,
  firebaseSignInFacebook: PropTypes.func.isRequired,
  firebaseSignOut: PropTypes.func.isRequired,
  userSignatures: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default NavBar;
