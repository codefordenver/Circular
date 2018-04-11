import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import GoogleButton from 'react-google-button';
import { Row, Col, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';
import Checkbox from './SignatureCheckbox';
import ToolList from './ToolList';
import {
  addSignatureToCampaign,
  removeSignatureFromCampaign,
  fetchUserSignatures,
  logSignerOut
} from '../redux/actions/signature';

class SignCampaign extends Component {
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.auth._id !== nextProps.auth._id) {
      this.props.fetchUserSignatures(nextProps.auth._id);
    }
  };

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  handleSignOut = () => {
    this.props.logSignerOut();
  };

  handleSignCampaign = async formSubmitEvent => {
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
  };

  handleRemoveSignature = async formSubmitEvent => {
    formSubmitEvent.preventDefault();

    const { _userID, _campaignID, _id } = this.props.userSignatures;

    await this.props.removeSignatureFromCampaign(_userID, _campaignID, _id);
  };

  createCheckbox = label => (
    <FormGroup key={label} className="text-center">
      <h4>
        <Checkbox label={label} handleCheckboxChange={this.toggleCheckbox} number="1" />
      </h4>
    </FormGroup>
  );
  createCheckboxes = () => {
    const checkboxes = ['Keep me updated on this campaign'];
    if (this.props.auth._id) {
      return checkboxes.map(label => this.createCheckbox(label));
    }
    return <div />;
  };

  checkSignIn = () => {
    // user is not signed in
    if (this.props.auth && (!this.props.auth.googleID && !this.props.auth.facebookID)) {
      return (
        <Row>
          <Col md={12}>
            <h4>Sign In With:</h4>
            <a className="login-button-signature" href="/auth/facebook">
              <Button bsStyle="remove-default" className="btn btn-facebook btn-login" block>
                <i className="fa fa-facebook-square" />Login with Facebook
              </Button>
            </a>
            <h5 className="content text-center">OR</h5>
            <a className="login-button-signature" href="/auth/google">
              <GoogleButton className="btn-google btn-login" />
            </a>
          </Col>
        </Row>
      );
    }
    // User is signed in AND has signed campaign
    const userHasSignedCampaign =
      this.props.auth &&
      this.props.signatureObj.signatures &&
      this.props.signatureObj.signatures.some(name => name.id === this.props.auth._id);
    if (userHasSignedCampaign) {
      return (
        <div>
          <Row>
            <Col md={12}>
              <form onSubmit={this.handleRemoveSignature}>{this.renderSignButton()}</form>
            </Col>
          </Row>
          <ToolList />
          <Row>
            <Col md={12}>
              <div className="text-center">
                <Button className="logout-button-signature" onClick={this.handleSignOut} block>
                  Sign Out
                  <i className="fa fa-sign-out" />
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      );
    }
    // User is signed in but hasn't signed campaign
    return (
      <Row>
        <Col md={12}>
          <form onSubmit={this.handleSignCampaign}>
            <FormGroup controlId="signingBecause">
              <ControlLabel id="control-label">
                <h4>I'm signing because...</h4>
              </ControlLabel>
              <FormControl
                className="form-resize-vertical"
                componentClass="textarea"
                placeholder="Optional"
              />
              {this.createCheckboxes()}
              {this.renderSignButton()}
              <h5 className="content remove-margin text-center">OR</h5>
            </FormGroup>
            <Button className="logout-button-signature" onClick={this.handleSignOut} block>
              Sign Out
              <i className="fa fa-sign-out" />
            </Button>
          </form>
        </Col>
      </Row>
    );
  };

  renderSignButton = () => {
    const campaignId =
      this.props.activeCampaign &&
      this.props.activeCampaign.campaign &&
      this.props.activeCampaign.campaign._id;

    if (!this.props.userSignatures._campaignID) {
      return (
        <div className="sign-campaign-actions">
          <Button
            className="remove-default sign-petition-button"
            value="submit"
            type="submit"
            block
          >
            Sign the petition
          </Button>
        </div>
      );
    } else if (campaignId && this.props.userSignatures._campaignID === campaignId) {
      return (
        <div className="sign-campaign-actions">
          <div className="text-center thanks-for-header">
            <h4>Thanks for Signing</h4>
          </div>
          <Button
            className="remove-default sign-petition-button"
            value="submit"
            type="submit"
            block
          >
            Remove signature from the petition
          </Button>
        </div>
      );
    }

    return (
      <div className="sign-campaign-actions">
        <p>
          You have already signed a separate campaign. Go to
          <Link to={`/campaign/${this.props.userSignatures._campaignID}`}>signed campaign</Link>
        </p>
      </div>
    );
  };

  render() {
    return (
      <Row className="show-grid">
        <Col md={12} className="sign-campaign-resets">
          <div className="sig-head">
            <h2 className="content text-center">Yes, I Want Recycling!</h2>
          </div>
          <div className="side-wrap">
            <Row>
              <Col md={12}>{this.checkSignIn()}</Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}

SignCampaign.defaultProps = {
  signatureObj: { signatures: [] },
  auth: {},
  userSignatures: {}
};

SignCampaign.propTypes = {
  signatureObj: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    signatures: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.objectOf(PropTypes.any)
  }).isRequired,
  userSignatures: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    _userID: PropTypes.string.isRequired,
    _campaignID: PropTypes.string.isRequired
  }),
  auth: PropTypes.shape({
    _id: PropTypes.string,
    googleID: PropTypes.string,
    facebookID: PropTypes.string,
    name: PropTypes.string
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
  removeSignatureFromCampaign: PropTypes.func.isRequired,
  fetchUserSignatures: PropTypes.func.isRequired,
  logSignerOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  userSignatures: {
    ...state.signature.userSignatures
  },
  activeCampaign: state.activeCampaign
});

export default connect(mapStateToProps, {
  addSignatureToCampaign,
  removeSignatureFromCampaign,
  fetchUserSignatures,
  logSignerOut
})(SignCampaign);
