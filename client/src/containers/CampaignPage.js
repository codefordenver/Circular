import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const CampaignPage = props => (
  <div className="app-container">
    <h1>I am a campaign page</h1>
    { props.loading && <i className="fa fa-recycle fa-4x fa-spin" /> }
    { props.loaded && props.activeCampaign &&
    <p>{`Welcome to the ${props.activeCampaign.street_address} recycling campaign!`}</p> }
  </div>
);

export default connect(
  ({ activeCampaign }) => ({ ...activeCampaign }))(withRouter(CampaignPage));
