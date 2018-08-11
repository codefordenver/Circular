import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class WelcomeModal extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="welcome-modal">
        <div className="welcome-header">
          <h1>WELCOME!</h1>
          <h2>Want recyling?</h2>
          {this.props.activeCampaign.campaign ? (
            <h2>Sign the petition to bring it to{this.props.activeCampaign.campaign.address}</h2>
          ) : (
            ''
          )}
        </div>
        <div className="sign-with-box">
          <h3>SIGN WITH:</h3>
          <button className="google-btn">GOOGLE</button>
          <h3>OR</h3>
          <button className="facebook-btn">FACEBOOK</button>
          <h3>OR</h3>
          <form>
            <label htmlFor="first-name-input">First Name:</label>
            <input id="first-name-input" />
            <label htmlFor="last-name-input">Last Name:</label>
            <input id="last-name-input" />
            <label htmlFor="email-input">Email:</label>
            <input id="email-input" />
            <input type="checkbox" id="status-request-input" checked />
            <label htmlFor="status-request-input">
              Keep me updated on the status of the request
            </label>
            <input type="checkbox" id="public-display-input" checked />
            <label htmlFor="public-display-input">
              Publicly display my first name on this page
            </label>
            <p>By signing, you accept the Terms of Service and Privacy Policy.</p>
            <button className="submit-btn">SUBMIT</button>
          </form>
        </div>
        <button>No thanks, I'll sign later -></button>
      </div>
    );
  }
}

export default connect(
  ({ signature, activeCampaign }) => ({
    signature,
    activeCampaign
  }),
  null
)(withRouter(WelcomeModal));
