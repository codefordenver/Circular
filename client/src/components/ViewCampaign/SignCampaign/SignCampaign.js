import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
// REDUX ACTIONS
import { firebaseUpdateCampaign } from "../../../redux/actions/firebaseCampaigns";
import {
  removeSignatureFromCampaign,
  fetchUserSignatures
} from "../../../redux/actions/signature";
// COMPONENTS
import RenderSignCampaign from "./RenderSignCampaign";
import RenderRemoveSignature from "./RenderRemoveSignature";
import RenderSignIn from "./RenderSignIn";
import RenderUserHasSignedOtherCampaign from "./RenderUserHasSignedOtherCampaign";
import UpdateCampaignModal from "../UpdateCampaign/UpdateCampaignModal";
import {
  buildingInformation,
  propertyManager,
  wasteProvider
} from "../UpdateCampaign/UpdateCampaignModalData";

class SignCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keepMeUpdated: false,
      signerMessage: "",
      showUpdateCampaignModal: true
    };
  }

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
    await this.props.signCampaignProps.firebaseAddSignatureToCampaign(
      signatureObject
    );
  };

  handleRemoveSignatureFromCamapaign = () => {
    const {
      activeCampaign: { campaignId },
      auth: { uid }
    } = this.props.signCampaignProps;
    return this.props.signCampaignProps.firebaseRemoveSignatureFromCampaign(
      campaignId,
      uid
    );
  };

  toggleShowUpdateCampaignModal = () => {
    this.setState(prevState => {
      return {
        showUpdateCampaignModal: !prevState.showUpdateCampaignModal
      };
    });
  };

  handleUpdateCampaign = updatedCampaignData => {
    console.log("hit the clicker", updatedCampaignData);
    this.props.firebaseUpdateCampaign(
      this.props.activeCampaign.campaignId,
      updatedCampaignData
    );
  };

  render() {
    const { firebaseWasteProviders } = this.props;
    const {
      auth,
      auth: { signedCampaignId },
      activeCampaign,
      activeCampaign: { loaded, activeCampaignSignatures },
      firebaseSignInFacebook,
      firebaseSignInGoogle
    } = this.props.signCampaignProps;
    const {
      keepMeUpdated,
      showUpdateCampaignModal,
      signerMessage
    } = this.state;
    const activeCampaignIncludesUsersSignature =
      activeCampaign &&
      activeCampaignSignatures !== undefined &&
      activeCampaignSignatures.length > 0 &&
      activeCampaignSignatures
        .map(signature => signature.uid)
        .includes(auth.uid);
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
                    onHide={this.toggleShowUpdateCampaignModal}
                    propertyManager={propertyManager}
                    show={showUpdateCampaignModal}
                    toggleShowUpdateCampaignModal={
                      this.toggleShowUpdateCampaignModal
                    }
                    handleUpdateCampaign={this.handleUpdateCampaign}
                    wasteProvider={wasteProvider}
                    firebaseWasteProviders={firebaseWasteProviders}
                  />
                )}
              <Col md={12}>
                {/*  user isn't signed in */}
                {loaded &&
                  auth.status === "ANONYMOUS" && (
                    <RenderSignIn
                      firebaseSignInGoogle={firebaseSignInGoogle}
                      firebaseSignInFacebook={firebaseSignInFacebook}
                    />
                  )}
                {/*  user is signed in && hasn't signed a campaign */}
                {loaded &&
                  auth.status === "SIGNED_IN" &&
                  activeCampaign &&
                  signedCampaignId === null && (
                    <RenderSignCampaign
                      handleAddSignatureToCampaign={
                        this.handleAddSignatureToCampaign
                      }
                      keepMeUpdated={keepMeUpdated}
                      keepMeUpdatedLabel={"Keep Me Updated On This Campaign"}
                      signerMessage={signerMessage}
                      toggleKeepMeUpdatedCheckbox={
                        this.toggleKeepMeUpdatedCheckbox
                      }
                      updateSignerMessage={this.updateSignerMessage}
                    />
                  )}
                {/*  USER AHS SIGNED CAMPAIGN AND IS SIGNED IN*/}
                {/* RENDER REMOVE SIGNATURE FEATURES */}
                {loaded &&
                  auth.status === "SIGNED_IN" &&
                  activeCampaign &&
                  activeCampaignSignatures &&
                  activeCampaignIncludesUsersSignature && (
                    <RenderRemoveSignature
                      handleRemoveSignatureFromCamapaign={
                        this.handleRemoveSignatureFromCamapaign
                      }
                    />
                  ) && (
                    <Button
                      style={{ marginTop: "1em" }}
                      bsStyle="info"
                      block
                      onClick={this.toggleShowUpdateCampaignModal}
                    >
                      Update Campaign Info
                    </Button>
                  )}
                {/* user is signed in && is currently on a page different
                from their signed campaign page */}
                {loaded &&
                  auth.status === "SIGNED_IN" &&
                  signedCampaignId &&
                  signedCampaignId !== null &&
                  signedCampaignId !== "userRemovedSignature" &&
                  !activeCampaignIncludesUsersSignature && (
                    <RenderUserHasSignedOtherCampaign
                      signedCampaignId={signedCampaignId}
                    />
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
  activeCampaign: state.activeCampaign,
  userSignatures: {
    ...state.signature.userSignatures
  },
  firebaseWasteProviders: state.firebaseWasteProviders
});

export default connect(mapStateToProps, {
  firebaseUpdateCampaign,
  fetchUserSignatures,
  removeSignatureFromCampaign
})(SignCampaign);
