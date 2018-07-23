import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { removeSignatureFromCampaign, fetchUserSignatures } from '../../../redux/actions/signature';
import RenderSignIn from './RenderSignIn';
import RenderSignCampaign from './RenderSignCampaign';
import RenderRemoveSignature from './RenderRemoveSignature';
import RenderUserHasSignedOtherCampaign from './RenderUserHasSignedOtherCampaign';

class SignCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keepMeUpdated: false,
      signerMessage: ''
    };
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  toggleKeepMeUpdatedCheckbox = () => {
    this.setState({
      keepMeUpdated: !this.state.keepMeUpdated
    });
  };

  updateSignerMessage = e => {
    const signerMessage = e.target.value;
    this.setState({
      signerMessage
    });
  };

  handleAddSignatureToCampaign = async () => {
    /* eslint-disable no-unsued-vars */
    const {
      auth: { uid, displayName },
      activeCampaign: { campaignId }
    } = this.props.signCampaignProps;
    const { signerMessage, keepMeUpdated } = this.state;
    const signatureObject = {
      uid,
      displayName,
      signerMessage,
      keepMeUpdated,
      campaignId
    };
    await this.props.signCampaignProps.firebaseAddSignatureToCampaign(signatureObject);
  };

  handleRemoveSignatureFromCamapaign = async () => {
    const { activeCampaign: { campaignId }, auth: { uid } } = this.props.signCampaignProps;
    await this.props.signCampaignProps.firebaseRemoveSignatureFromCampaign(campaignId, uid);
  };

  // handleSignCampaign = async formSubmitEvent => {
  //   formSubmitEvent.preventDefault();

  //   const campaignId =
  //     this.props.activeCampaign &&
  //     this.props.activeCampaign.campaign &&
  //     this.props.activeCampaign.campaign.campaignId;

  //   await this.props.addSignatureToCampaign(
  //     this.props.auth.uid,
  //     this.selectedCheckboxes,
  //     campaignId
  //   );
  // };

  // handleRemoveSignature = async e => {
  //   e.preventDefault();
  //   const { _userID, _campaignID, _id } = this.props.userSignatures;
  //   await this.props.removeSignatureFromCampaign(_userID, _campaignID, _id);
  // };

  render() {
    const {
      firebaseSignInGoogle,
      firebaseSignInFacebook,
      auth,
      activeCampaign,
      activeCampaign: { loaded, activeCampaignSignatures }
    } = this.props.signCampaignProps;
    const { keepMeUpdated, signerMessage } = this.state;
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
                    <RenderSignIn
                      firebaseSignInGoogle={firebaseSignInGoogle}
                      firebaseSignInFacebook={firebaseSignInFacebook}
                    />
                  )}
                {/*  user is signed in && hasn't signed a campaign */}
                {loaded &&
                  auth.status === 'SIGNED_IN' &&
                  activeCampaign &&
                  activeCampaignSignatures &&
                  !activeCampaignSignatures.map(signature => signature.uid).includes(auth.uid) && (
                    <RenderSignCampaign
                      handleAddSignatureToCampaign={this.handleAddSignatureToCampaign}
                      keepMeUpdated={keepMeUpdated}
                      keepMeUpdatedLabel={'Keep Me Updated On This Campaign'}
                      signerMessage={signerMessage}
                      toggleKeepMeUpdatedCheckbox={this.toggleKeepMeUpdatedCheckbox}
                      updateSignerMessage={this.updateSignerMessage}
                    />
                  )}
                {/*  user is signed in && has signed a campaign */}
                {loaded &&
                  auth.status === 'SIGNED_IN' &&
                  activeCampaign &&
                  activeCampaignSignatures &&
                  activeCampaignSignatures.map(signature => signature.uid).includes(auth.uid) && (
                    <RenderRemoveSignature
                      handleRemoveSignatureFromCamapaign={this.handleRemoveSignatureFromCamapaign}
                    />
                  )}
                {/* user is signed in && is currently on a page different
                from their signed campaign page */}
                {/* {loaded &&
                  userSignatures._campaignID &&
                  userSignatures._campaignID !== activeCampaign.campaignId && (
                    <RenderUserHasSignedOtherCampaign campaignID={userSignatures._campaignID} />
                  )} */}
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
  signCampaignProps: PropTypes.shape({
    activeCampaign: PropTypes.shape({
      loaded: PropTypes.bool.isRequired,
      campaign: PropTypes.shape({
        _id: PropTypes.string.isRequired
      })
    }).isRequired,
    auth: PropTypes.shape({
      uid: PropTypes.string
    }).isRequired,
    firebaseAddSignatureToCampaign: PropTypes.func.isRequired,
    firebaseRemoveSignatureFromCampaign: PropTypes.func.isRequired,
    firebaseSignInGoogle: PropTypes.func.isRequired,
    firebaseSignInFacebook: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  userSignatures: {
    ...state.signature.userSignatures
  },
  activeCampaign: state.activeCampaign
});

export default connect(mapStateToProps, {
  removeSignatureFromCampaign,
  fetchUserSignatures
})(SignCampaign);
