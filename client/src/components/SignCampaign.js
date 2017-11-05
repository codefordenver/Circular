import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleButton from 'react-google-button';
import { addSignatureToCampaign } from '../redux/actions/signature';


class SignCampaign extends Component {
  renderError() {
    return (
      <div className="error-message">
        {this.props.signatureObj.error && this.props.signatureObj.error.code === 11000
          ? 'You already have signed this petition!'
          : null}
      </div>
    );
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
        {this.renderError()}
        <div>{this.renderContent()}</div>
      </div>
    );
  }
}

export default connect(({ auth, activeCampaign }) => ({ auth, activeCampaign }), {
  addSignatureToCampaign
})(SignCampaign);
