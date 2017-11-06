import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

    if (this.props.auth === undefined) {
      return <div />;
    }

    if (!this.props.auth.googleID) {
      return (
        <a className="google-button-signature" href="/auth/google">
          <GoogleButton label="Google" />
        </a>
      );
    }
    return (
      <button
        className="pure-button"
        onClick={() => {
          this.props.addSignatureToCampaign(this.props.auth._id, campaignId);
        }}
      >
        Sign the petition!
      </button>
    );
  }
  render() {
    return (
      <div className="sign-campaign-wrapper">
        <h1>Yes, I Want Recycling!</h1>
        {this.renderError()}
        <div className="sign-campaign-signature-button">
          <div>Sign with:</div>
        </div>
        <div>{this.renderContent()}</div>
      </div>
    );
  }
}

SignCampaign.defaultProps = {
  signatureObj: { signatures: [] },
  auth: {}
};

SignCampaign.propTypes = {
  signatureObj: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    signatures: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.objectOf(PropTypes.any)
  }).isRequired,
  auth: PropTypes.shape({
    _id: PropTypes.string,
    googleID: PropTypes.string
  }),
  activeCampaign: PropTypes.shape({
    campaign: PropTypes.shape({
      street_address: PropTypes.string,
      _id: PropTypes.string
    }),
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  }).isRequired,
  addSignatureToCampaign: PropTypes.func.isRequired
};

export default connect(({ auth, activeCampaign }) => ({ auth, activeCampaign }), {
  addSignatureToCampaign
})(SignCampaign);
