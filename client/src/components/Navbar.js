import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logSignerOut, fetchUserSignatures } from '../redux/actions/signature';

function MyCampaignNavItem(props) {
  return (
    <NavItem eventKey={4} href={`/campaign/${props.campaignId}`}>
      MY CAMPAIGN
    </NavItem>
  );
}

// RENDERS UserAuthNav ITEM WITH LOGIN / LOGOUT BASED ON AUTH STATUS
function UserAuthNav(props) {
  // checks if user is not currently authed with google or facebook
  if (props.auth && (!props.auth.googleID && !props.auth.facebookID)) {
    return (
      // if not logged in > show sign in options
      <NavDropdown id="tools-dropdown" eventKey={5} title="LOGIN">
        <MenuItem eventKey={5.1} href="/auth/facebook">
          Sign in With Facebook
        </MenuItem>
        <MenuItem eventKey={5.2} href="/auth/google">
          Sign in With Google
        </MenuItem>
      </NavDropdown>
    );
  }
  const {
    auth: { name }
  } = props;

  const endOfFirstName = name.indexOf(' ') !== -1 ? name.indexOf(' ') : name.length;
  const firstName = name.substr(0, endOfFirstName);

  const logOutUser = props.logOutUser;
  // if logged in > show sign out options
  return (
    <NavItem eventKey={5} onClick={logOutUser}>
      SIGN OUT, {firstName.toUpperCase()}
    </NavItem>
  );
}

class NavBar extends React.Component {
  componentWillReceiveProps = nextProps => {
    if (this.props.auth._userID !== nextProps.auth._userID) {
      this.props.fetchUserSignatures(nextProps.auth._userID);
    }
  };

  render() {
    // used "!!" to cast variable to boolean. Used to avoid the behavior of undefined in
    // conditional logic. In brief !undefined = true > !true = false
    const userIsLoggedIn =
      this.props.auth && (!!this.props.auth.googleID || !!this.props.auth.facebookID);
    const userHasSignedCampaign = userIsLoggedIn && this.props.userSignatures._campaignID;

    let homeText;
    this.props.location.pathname === '/' ? (homeText = 'RE:IMAGINE DENVER') : (homeText = 'HOME');
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
              WHY
            </NavItem>
            <NavItem eventKey={6} href="how-does-this-work">
              HOW IT WORKS
            </NavItem>
            <NavItem eventKey={3} href="/who-are-we">
              WHO WE ARE
            </NavItem>
            <NavDropdown id="tools-dropdown" eventKey={2} title="TOOLS">
              <MenuItem eventKey={2.1} href="/manager-resources">
                Property Manager Resources
              </MenuItem>
              <MenuItem eventKey={2.2} href="/tips-for-requesting">
                Tips for Requesting
              </MenuItem>
            </NavDropdown>
            {/*  RENDERS MyCampaignNavItem BASED ON AUTH STATUS */}
            {userHasSignedCampaign && (
              <MyCampaignNavItem campaignId={this.props.userSignatures._campaignID} />
            )}
            {/* UserAuthNav (Login/Logout) */}
            <UserAuthNav auth={this.props.auth} logOutUser={this.props.logSignerOut} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

MyCampaignNavItem.propTypes = {
  campaignId: PropTypes.string.isRequired
};

UserAuthNav.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    name: PropTypes.string,
    googleID: PropTypes.string,
    facebookID: PropTypes.string
  }).isRequired
};

NavBar.propTypes = {
  logSignerOut: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    _userID: PropTypes.string,
    name: PropTypes.string,
    googleID: PropTypes.string,
    facebookID: PropTypes.string
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  userSignatures: PropTypes.shape({
    _campaignID: PropTypes.string
  }).isRequired,
  fetchUserSignatures: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: {
    _userID: state.auth._id,
    name: state.auth.name,
    googleID: state.auth.googleID,
    facebookID: state.auth.facebookID
  },
  userSignatures: {
    ...state.signature.userSignatures
  }
});

export default connect(
  mapStateToProps,
  {
    logSignerOut,
    fetchUserSignatures
  }
)(NavBar);
