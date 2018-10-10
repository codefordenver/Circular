import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
// REDUX ACTIONS
import { firebaseUpdateCampaign } from '../../../redux/actions/firebaseCampaigns';
import { fetchUserSignatures, removeSignatureFromCampaign } from '../../../redux/actions/signature';
// COMPONENTS
import RenderSignCampaign from './RenderSignCampaign';
import RenderRemoveSignatureAndUpdateCampaign from './RenderRemoveSignatureAndUpdateCampaign';
import RenderSignIn from './RenderSignIn';
import RenderUserHasSignedOtherCampaign from './RenderUserHasSignedOtherCampaign';
import UpdateCampaignModal from '../UpdateCampaign/UpdateCampaignModal';
import {
  buildingInformation,
  propertyManager,
  wasteProvider
} from '../UpdateCampaign/UpdateCampaignModalData';

class SignCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keepMeUpdated: false,
      signerMessage: '',
      showUpdateCampaignModal: false
    };
  }

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

  handleRemoveSignatureFromCamapaign = () => {
    const {
      activeCampaign: { campaignId },
      auth: { uid }
    } = this.props.signCampaignProps;
    return this.props.signCampaignProps.firebaseRemoveSignatureFromCampaign(campaignId, uid);
  };

  handleRenderSignCampaign = (auth, activeCampaign, keepMeUpdated, loaded, signerMessage) => {
    if (loaded && auth.status === 'SIGNED_IN' && activeCampaign && auth.signedCampaignId === null) {
      return (
        <RenderSignCampaign
          handleAddSignatureToCampaign={this.handleAddSignatureToCampaign}
          keepMeUpdated={keepMeUpdated}
          keepMeUpdatedLabel={'Keep Me Updated On This Campaign'}
          signerMessage={signerMessage}
          toggleKeepMeUpdatedCheckbox={this.toggleKeepMeUpdatedCheckbox}
          updateSignerMessage={this.updateSignerMessage}
        />
      );
    }
    return null;
  };

  handleUpdateCampaign = updatedCampaignData => {
    this.props.firebaseUpdateCampaign(
      this.props.signCampaignProps.activeCampaign.campaignId,
      updatedCampaignData
    );
  };

  toggleKeepMeUpdatedCheckbox = () => {
    this.setState({
      keepMeUpdated: !this.state.keepMeUpdated
    });
  };

  toggleShowUpdateCampaignModal = () => {
    this.setState(prevState => ({
      showUpdateCampaignModal: !prevState.showUpdateCampaignModal
    }));
  };

  updateSignerMessage = e => {
    const signerMessage = e.target.value;
    this.setState({
      signerMessage
    });
  };

  userIsAdmin = (activeCampaign, auth) => {
    if (activeCampaign.campaignId === auth.createdCampaignId) {
      return true;
    }
    return false;
  };

  userHasSignedThisCampaign = (activeCampaign, loaded, signedCampaignId, userIsAdmin) => {
    if (loaded && activeCampaign.campaignId === signedCampaignId) {
      return (
        <RenderRemoveSignatureAndUpdateCampaign
          handleRemoveSignatureFromCamapaign={this.handleRemoveSignatureFromCamapaign}
          toggleShowUpdateCampaignModal={this.toggleShowUpdateCampaignModal}
          userIsAdmin={userIsAdmin}
        />
      );
    }
    return false;
  };

  userHasSignedAnotherCampaign = (auth, loaded, signedCampaignId, userHasSignedThisCampaign) => {
    if (
      loaded &&
      auth.status === 'SIGNED_IN' &&
      signedCampaignId &&
      signedCampaignId !== null &&
      !userHasSignedThisCampaign
    ) {
      return <RenderUserHasSignedOtherCampaign signedCampaignId={signedCampaignId} />;
    }
    return false;
  };

  render() {
    const { firebaseWasteProviders } = this.props;
    const {
      auth,
      auth: { signedCampaignId },
      activeCampaign,
      activeCampaign: { loaded },
      firebaseSignInFacebook,
      firebaseSignInGoogle
    } = this.props.signCampaignProps;
    const { keepMeUpdated, showUpdateCampaignModal, signerMessage } = this.state;
    const userIsAdmin = this.userIsAdmin(activeCampaign, auth);
    const userHasSignedThisCampaign = this.userHasSignedThisCampaign(
      activeCampaign,
      loaded,
      signedCampaignId,
      userIsAdmin
    );

    return (
      <Row className="show-grid">
        <Col md={12} className="sign-campaign-resets">
          <div className="sig-head">
            <h2 className="content text-center">Yes, I Want Recycling!</h2>
          </div>
          <div className="side-wrap">
            <Row>
              {this.state.showUpdateCampaignModal &&
                firebaseWasteProviders &&
                activeCampaign &&
                activeCampaign.wasteProvider && (
                  <UpdateCampaignModal
                    activeCampaign={activeCampaign}
                    buildingInformation={buildingInformation}
                    buttonText="Submit Updates"
                    firebaseWasteProviders={firebaseWasteProviders}
                    handleUpdateCampaign={this.handleUpdateCampaign}
                    onHide={this.toggleShowUpdateCampaignModal}
                    propertyManager={propertyManager}
                    show={showUpdateCampaignModal}
                    toggleShowUpdateCampaignModal={this.toggleShowUpdateCampaignModal}
                    // FROM DATA.JS
                    wasteProvider={wasteProvider}
                  />
                )}
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
                {this.handleRenderSignCampaign(
                  auth,
                  activeCampaign,
                  keepMeUpdated,
                  loaded,
                  signerMessage
                )}
                {/*  USER AHS SIGNED CAMPAIGN AND IS SIGNED IN */}
                {/* RENDER REMOVE SIGNATURE FEATURES */}
                {this.userHasSignedThisCampaign(
                  activeCampaign,
                  loaded,
                  signedCampaignId,
                  userIsAdmin
                )}
                {/* user is signed in && is currently on a page different
                from their signed campaign page */}
                {this.userHasSignedAnotherCampaign(
                  auth,
                  loaded,
                  signedCampaignId,
                  userHasSignedThisCampaign
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
  firebaseUpdateCampaign: PropTypes.func.isRequired,
  firebaseWasteProviders: PropTypes.shape({}).isRequired,
  signCampaignProps: PropTypes.shape({
    activeCampaign: PropTypes.shape({
      loaded: PropTypes.bool.isRequired,
      campaignId: PropTypes.string.isRequired
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
  activeCampaign: state.activeCampaign,
  userSignatures: {
    ...state.signature.userSignatures
  },
  firebaseWasteProviders: state.firebaseWasteProviders
});

export default connect(
  mapStateToProps,
  {
    firebaseUpdateCampaign,
    fetchUserSignatures,
    removeSignatureFromCampaign
  }
)(SignCampaign);
