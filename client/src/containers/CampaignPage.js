import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import fetchCampaignById from '../redux/actions/activeCampaign';

class CampaignPage extends Component {
  componentWillMount() {
    this.props.fetchCampaignById(this.props.params.id);
  }

  render() {
    const { activeCampaign: { loading, loaded, campaign } } = this.props;
    return (
      <div className="app-container">
        <h1>I am a campaign page</h1>
        { loading && <i className="fa fa-recycle fa-4x fa-spin" /> }
        { loaded && campaign &&
        <p>{`Welcome to the ${campaign.street_address} recycling campaign!`}</p> }
      </div>
    );
  }
}

CampaignPage.propTypes = {
  activeCampaign: PropTypes.shape({
    campaign: PropTypes.shape({
      street_address: PropTypes.string
    }),
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  }).isRequired,
  fetchCampaignById: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
};

export default connect(
  ({ activeCampaign }) => ({ activeCampaign }), { fetchCampaignById })(withRouter(CampaignPage));
