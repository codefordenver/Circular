import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, FormGroup } from 'react-bootstrap';
import Checkbox from './SignatureCheckbox';
import {
  addSignatureToCampaign,
  removeSignatureFromCampaign,
  fetchUserSignatures
} from '../redux/actions/signature';
import { signOut } from '../redux/actions/firebaseAuth';
import RenderSignIn from './SignCampaign/RenderSignIn';
import RenderSignCampaign from './SignCampaign/RenderSignCampaign';
import RenderRemoveSignature from './SignCampaign/RenderRemoveSignature';
import RenderUserHasSignedOtherCampaign from './SignCampaign/RenderUserHasSignedOtherCampaign';

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

  handleSignCampaign = async formSubmitEvent => {
    formSubmitEvent.preventDefault();

    const campaignId =
      this.props.activeCampaign &&
      this.props.activeCampaign.campaign &&
      this.props.activeCampaign.campaign._id;

    await this.props.addSignatureToCampaign(
      this.props.auth.uid,
      this.selectedCheckboxes,
      campaignId
    );
  };

  handleRemoveSignature = async e => {
    e.preventDefault();
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

  render() {
    const {
      signInGoogle,
      signInFacebook,
      auth,
      userSignatures,
      activeCampaign,
      activeCampaign: { loaded }
    } = this.props;
    return (
      <Row className="show-grid">
        <Col md={12} className="sign-campaign-resets">
          <div className="sig-head">
            <h2 className="content text-center">Yes, I Want Recycling!</h2>
          </div>
          <div className="side-wrap">
            <Row>
              <Col md={12}>
                {/*  user isn't signed in */}
                {loaded &&
                  auth.status === 'ANONYMOUS' && (
                    <RenderSignIn signInGoogle={signInGoogle} signInFacebook={signInFacebook} />
                  )}
                {/*  user is signed in && hasn't signed a campaign */}
                {loaded &&
                  userSignatures._campaignId === null && (
                    <RenderSignCampaign
                      createCheckBoxes={this.createCheckBoxes}
                      handleSignCampaign={this.handleSignCampaign}
                    />
                  )}
                {/*  user is signed in && has signed a campaign */}
                {loaded &&
                  auth.status === 'SIGNED_IN' &&
                  activeCampaign.campaign._id === userSignatures._campaignID && (
                    <RenderRemoveSignature handleRemoveSignature={this.handleRemoveSignature} />
                  )}
                {/* user is signed in && is currently on a page different
                from their signed campaign page */}
                {loaded &&
                  userSignatures._campaignID &&
                  userSignatures._campaignID !== activeCampaign.campaign._id && (
                    <RenderUserHasSignedOtherCampaign campaignID={userSignatures._campaignID} />
                  )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}

SignCampaign.defaultProps = {
  auth: {
    uid: null
  },
  userSignatures: {
    _campaignId: null
  }
};

SignCampaign.propTypes = {
  activeCampaign: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    campaign: PropTypes.shape({
      _id: PropTypes.string.isRequired
    })
  }).isRequired,
  auth: PropTypes.shape({
    uid: PropTypes.string
  }).isRequired,
  userSignatures: PropTypes.shape({
    _campaignId: PropTypes.string
  }).isRequired,
  removeSignatureFromCampaign: PropTypes.func.isRequired,
  signInGoogle: PropTypes.func.isRequired,
  signInFacebook: PropTypes.func.isRequired,
  addSignatureToCampaign: PropTypes.func.isRequired
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
  signOut
})(SignCampaign);
