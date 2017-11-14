import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Checkbox from './SignatureCheckbox';
import { addSignature } from '../redux/actions/signature';
import LoginButton from './LoginButton';

const authId = process.env.REACT_APP_GOOGLE_AUTH_ID;

class SignCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.googleBtn = '';
  }

  setNodeRef = node => {
    this.googleBtn = node;
  };

  handleLoginSuccess = async data => {
    this.setState({ loggedIn: true });
    const signatureData = {
      userData: data._profile,
      campaignID: this.props.activeCampaign.campaign._id,
      keepUpdated: true
    };
    try {
      await this.props.addSignature(signatureData);
      this.logout();
    } catch (err) {
      console.error('addSignature error:', err);
      this.logout();
    }
  };

  handleLoginFailure = err => {
    console.error('login error:', err);
  };

  logout = () => {
    this.googleBtn && this.googleBtn.props.triggerLogout();
  };

  handleLogoutSuccess = () => {
    this.setState({ loggedIn: false });
  };

  handleLogoutFailure = err => {
    console.error('logout error:', err);
  };

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  render() {
    return (
      <div className="sign-campaign-wrapper">
        <h1>Yes, I Want Recycling!</h1>
        <div className="sign-campaign-signature-button">
          <div>Sign with:</div>
          <LoginButton
            disabled={this.state.loggedIn}
            provider="google"
            appId={`${authId}`}
            onLoginSuccess={this.handleLoginSuccess}
            onLoginFailure={this.handleLoginFailure}
            onLogoutSuccess={this.handleLogoutSuccess}
            onLogoutFailure={this.handleLogoutFailure}
            getInstance={node => this.setNodeRef(node)}
            key="google"
          >
            {'GOOGLE'}
          </LoginButton>
          <Checkbox
            label="Keep me updated on the status of this request"
            handleCheckboxChange={this.toggleCheckbox}
          />
        </div>
      </div>
    );
  }
}

SignCampaign.propTypes = {
  activeCampaign: PropTypes.shape({
    campaign: PropTypes.shape({
      street_address: PropTypes.string,
      _id: PropTypes.string
    }),
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  }).isRequired,
  addSignature: PropTypes.func.isRequired
};

export default connect(({ auth, activeCampaign }) => ({ auth, activeCampaign }), {
  addSignature
})(withRouter(SignCampaign));
