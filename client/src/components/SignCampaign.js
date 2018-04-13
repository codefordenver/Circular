import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import GoogleButton from 'react-google-button';
import { Row, Col, FormGroup, Button, ControlLabel, FormControl, Alert } from 'react-bootstrap';
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
    const campaignId =
      this.props.activeCampaign &&
      this.props.activeCampaign.campaign &&
      this.props.activeCampaign.campaign._id;

    const signedIn = this.props.auth && (this.props.auth.googleID || this.props.auth.facebookID);
    const userHasSignedThisCampaign =
      campaignId && this.props.userSignatures._campaignID === campaignId;
    const userHasSignedOtherCampaign =
      !!this.props.userSignatures._id && !userHasSignedThisCampaign;
    const userHasNotSignedAnyCampaign = !this.props.userSignatures._id;

    // user is not signed in
    const renderSignIn = (
      <div>
        {this.props.activeCampaign.loaded &&
          !signedIn && (
            <div>
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
            </div>
          )}
      </div>
    );

    // user is signed in && hasn't signed a campaign
    const renderSignCampaignPrompt = (
      <div>
        {this.props.activeCampaign.loaded &&
          signedIn &&
          userHasNotSignedAnyCampaign && (
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
              </FormGroup>
            </form>
          )}
      </div>
    );

    // user is signed in && has signed campaign
    const renderRemoveSignaturePrompt = (
      <div>
        {this.props.activeCampaign.loaded &&
          signedIn &&
          userHasSignedThisCampaign && (
            <div className="text-center thanks-for-alert">
              <Alert bsStyle="success">
                <h4>Thanks for Signing!</h4>
              </Alert>
              <ToolList />
              <div className="text-center">
                <Button
                  className="logout-button-signature"
                  onClick={this.handleRemoveSignature}
                  block
                >
                  <i className="fa fa-times-circle" />
                  Unsign This Campaign
                </Button>
              </div>
            </div>
          )}
      </div>
    );

    // user is signed in && is currently on a page different from their signed campaign page
    const renderUserHasSignedOtherCampaignPrompt = (
      <div className="user-has-signed-other-campaign-alert">
        {this.props.activeCampaign.loaded &&
          userHasSignedOtherCampaign && (
            <Alert bsStyle="warning" onDismiss={this.handleDismiss}>
              <h4>You can only sign one campaign at a time.</h4>
              <p>Looks like you have already signed a campaign, you little overachiever you.</p>
              <Button
                bsStyle="remove-default"
                className="user-has-signed-other-campaign-button"
                block
              >
                <Link to={`/campaign/${this.props.userSignatures._campaignID}`}>
                  Go To My Campaign
                </Link>
              </Button>
            </Alert>
          )}
      </div>
    );

    return (
      <div>
        <Row>
          <Col md={12}>
            {renderSignIn}
            {renderUserHasSignedOtherCampaignPrompt}
            {renderRemoveSignaturePrompt}
            {renderSignCampaignPrompt}
          </Col>
        </Row>
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
  auth: {},
  userSignatures: {}
};

SignCampaign.propTypes = {
  userSignatures: PropTypes.shape({
    _id: PropTypes.string,
    _userID: PropTypes.string,
    _campaignID: PropTypes.string
  }).isRequired,
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
  fetchUserSignatures: PropTypes.func.isRequired
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
