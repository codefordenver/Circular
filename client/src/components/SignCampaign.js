import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSignatureToCampaign } from '../redux/actions/signature';

import GoogleButton from 'react-google-button';

class SignCampaign extends Component {
  constructor(props) {
    super(props);
  }

  renderContent() {
    const campaignId =
      this.props.activeCampaign &&
      this.props.activeCampaign.campaign &&
      this.props.activeCampaign.campaign._id;

    if (this.props.auth.data === undefined) {
      return;
    }

    if (!this.props.auth.data.googleID) {
      return (
        <a className="google-button-signature" href="/auth/google">
          <GoogleButton label="Sign in to google to sign!" />
        </a>
      );
    }
    return (
      <button
        className="pure-button"
        onClick={() => {
          this.props.addSignatureToCampaign(this.props.auth.data._id, campaignId);
        }}
      >
        Sign the petition!
      </button>
    );
  }
  render() {
    return (
      <div>
        <h1>Show your support!</h1>
        <div>{this.renderContent()}</div>
      </div>
    );
  }
}

export default connect(({ auth, activeCampaign }) => ({ auth, activeCampaign }), {
  addSignatureToCampaign
})(SignCampaign);
