import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleButton from 'react-google-button';
import Checkbox from './SignatureCheckbox';
import SignupForm from './SignupForm';
import { addSignatureToCampaign, logSignerOut } from '../redux/actions/signature';

class SignCampaign extends Component {
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  handleFormSubmit = async formSubmitEvent => {
    formSubmitEvent.preventDefault();

    const campaignId =
      this.props.activeCampaign &&
      this.props.activeCampaign.campaign &&
      this.props.activeCampaign.campaign._id;

    await this.props.addSignatureToCampaign(
      this.props.auth._id,
      this.selectedCheckboxes,
      campaignId
    );

    this.props.logSignerOut();
  };

  createCheckbox = label => (
    <Checkbox label={label} handleCheckboxChange={this.toggleCheckbox} key={label} />
  );

  createCheckboxes = () => {
    const checkboxes = ['Keep me updated on the status of this request'];
    if (this.props.auth._id) {
      return checkboxes.map(label => this.createCheckbox(label));
    }
    return <div />;
  };

  checkSignIn = () => {
    if (this.props.auth && (!this.props.auth.googleID && !this.props.auth.facebookID)) {
      return (
        <div>
          <a className="google-button-signature" href="/auth/google">
            <GoogleButton label="Google" />
          </a>
          <a className="facebook-button-signature" href="/auth/facebook">
            Sign In With Facebook!
          </a>
        </div>
      );
    }
    return (
      <button className="btn" type="submit">
        Sign the petition
      </button>
    );
  };

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
    return (
      <div className="">
        <form onSubmit={this.handleFormSubmit}>
          {this.createCheckboxes()}
          {this.checkSignIn()}
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="sign-campaign-wrapper text-center">
        <h1 className="toUpperCase">Yes, I Want Recycling!</h1>
        <div className="col-10 offset-md-1 text-left">
          {this.renderError()}
          <h2 className="toUpperCase">I'm Signing Because</h2>
          <div className="form-group">
            <label htmlFor="sign-campaign-input" />
            <textarea
              className="form-control sign-campaign-input"
              id="sign-campaign-input"
              placeholder="Optional"
              rows="2"
            />
            <div className="">
              <h2 className="toUpperCase signup-camp">Signin with:</h2>
            </div>
          </div>
          <GoogleButton
            onClick={() => {
              alert('button clicked');
            }}
          />
          <div className="signup-camp text-center">
            <h4>- OR -</h4>
          </div>
          <GoogleButton
            onClick={() => {
              alert('button clicked');
            }}
          />
          <div className="signup-camp text-center">
            <h4>- OR -</h4>
          </div>
          <SignupForm />
        </div>
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
    googleID: PropTypes.string,
    facebookID: PropTypes.string
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
  addSignatureToCampaign,
  logSignerOut
})(SignCampaign);
