import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleButton from 'react-google-button';
import { Row, Col, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';
import Checkbox from './SignatureCheckbox';
import { addSignatureToCampaign, logSignerOut } from '../redux/actions/signature';
import SignWithCollapsePanel from '.././components/SignWithCollapsePanel';
import SignInWithEmail from './SignInWithEmail';

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
    <FormGroup>
      <Checkbox label={label} handleCheckboxChange={this.toggleCheckbox} key={label} number="1" />
    </FormGroup>
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
        <Row>
          <Col md={12}>
            <h4>Sign In With:</h4>
            <a className="login-button-signature" href="/auth/facebook">
              <Button bsStyle="remove-default" className="btn btn-facebook btn-login" block>
                <i className="fa fa-facebook-square " />Login with Facebook
              </Button>
            </a>
            <h5 className="content text-center">OR</h5>
            <a className="login-button-signature" href="/auth/google">
              <GoogleButton className="btn-google btn-login" />
            </a>
            <h5 className="content text-center">OR</h5>
            <SignWithCollapsePanel
              titleText="Sign In With Email"
              bsStyle="text-white"
              body={<SignInWithEmail />}
            />
          </Col>
        </Row>
      );
    }
    return (
      <Col md={10} mdOffset={1}>
        <Button bsStyle="remove-default" className="btn-sign" type="submit" block>
          Sign the petition
        </Button>
      </Col>
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
      <Row>
        <Col md={10} mdOffset={1}>
          <form onSubmit={this.handleFormSubmit}>
            {this.createCheckboxes()}
            {this.checkSignIn()}
          </form>
        </Col>
      </Row>
    );
  }

  renderImSigning() {
    return (
      <Row>
        <Col md={10} mdOffset={1}>
          <FormGroup controlId="signingBecause">
            <ControlLabel id="control-label">
              <h4>I'm signing because...</h4>
            </ControlLabel>
            <FormControl
              className="form-resize-vertical"
              componentClass="textarea"
              placeholder="Optional"
            />
          </FormGroup>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Row className="show-grid">
        <Col md={12} className="resets">
          <div className="sig-head">
            <h2 className="content text-center">Yes, I Want Recycling!</h2>
            {this.renderError()}
          </div>
          <div className="side-wrap">
            <div>{this.renderImSigning()}</div>
            <div>{this.renderContent()}</div>
          </div>
        </Col>
      </Row>
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
