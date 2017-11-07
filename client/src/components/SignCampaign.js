import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkbox from './SignatureCheckbox';
import GoogleButton from 'react-google-button';
import { addSignatureToCampaign, logSignerOut } from '../redux/actions/signature';

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

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  handleFormSubmit = async formSubmitEvent => {
    formSubmitEvent.preventDefault();

    const campaignId =
      this.props.activeCampaign &&
      this.props.activeCampaign.campaign &&
      this.props.activeCampaign.campaign._id;

    // if (this.props.auth === undefined) {
    //   return <div />;
    // } // I'm not sure this is needed but I don't remember what it was for...

    await this.props.addSignatureToCampaign(this.props.auth._id, this.selectedCheckboxes, campaignId);

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }
    // debugger
    this.props.logSignerOut()
  }

  createCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  )

  createCheckboxes = () => {
    const checkboxes = [
      'Keep me updated on the status of this request',
      'I agree with the Terms of Agreement and Privacy Policy'
    ]
    return checkboxes.map(label => this.createCheckbox(label))
  }

  checkSignIn = () => {
    if (this.props.auth && !this.props.auth.googleID) {
      return (
        <a className="google-button-signature" href="/auth/google">
          <GoogleButton label="Sign in to google to sign!" />
        </a>
      );
    } else {
      return (
        <a className="google-oauth-button" href="/api/logout">
          <GoogleButton label="Sign Out" />
        </a>
      );
    }
  }

  // signOut = () => {
  //
  // }

  renderContent() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              {this.checkSignIn()}
              <button className="btn" type="submit">Sign the petition</button>
            </form>
          </div>
        </div>

      </div>
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
  addSignatureToCampaign: PropTypes.func.isRequired,
  logSignerOut: PropTypes.func.isRequired
};

export default connect(({ auth, activeCampaign }) => ({ auth, activeCampaign }), {
  addSignatureToCampaign, logSignerOut
})(SignCampaign);
