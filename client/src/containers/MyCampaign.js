import React from 'react';
import { withRouter, Link } from 'react-router';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logSignerOut } from '../redux/actions/signature';
import fetchSignedCampaigns from '../redux/actions/user';

class MyCampaign extends React.Component {
  componentDidMount() {
    // what if user isnt logged in?
    // user should only be able to navagate here iff logged in
    this.props.fetchSignedCampaigns(this.props.auth._id);
  }

  handleSignOut = () => {
    this.props.logSignerOut();
    // send them to home page
  };

  listCampaigns = () => {
    const signedCampaignList = this.props.user.signedCampaigns.map(campaign => (
      <li key={campaign._id}>
        <Link to={`/campaign/${campaign._id}`}>{campaign.name}</Link>
      </li>
    ));
    return <ul>{signedCampaignList}</ul>;
  };

  renderSignOut = () => (
    <Row>
      <Col md={12}>
        <Button className="logout-button-signature" onClick={this.handleSignOut} block>
          Sign Out
          <i className="fa fa-sign-out" />
        </Button>
      </Col>
    </Row>
  );

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={10} mdOffset={1}>
            {this.listCampaigns()}
            {this.renderSignOut()}
          </Col>
        </Row>
      </Grid>
    );
  }
}

MyCampaign.defaultProps = {
  auth: {}
};

MyCampaign.propTypes = {
  auth: PropTypes.shape({
    _id: PropTypes.string,
    googleID: PropTypes.string,
    facebookID: PropTypes.string,
    name: PropTypes.string
  }),
  logSignerOut: PropTypes.func.isRequired,
  fetchSignedCampaigns: PropTypes.func.isRequired,
  user: PropTypes.shape({
    signedCampaigns: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired
};

export default connect(({ auth, user }) => ({ auth, user }), {
  fetchSignedCampaigns,
  logSignerOut
})(withRouter(MyCampaign));
