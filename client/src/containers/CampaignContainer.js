import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
// import fetchCampaignById from '../redux/actions/activeCampaign';
import { firebasePopulateCampaignById } from "../redux/actions/firebaseActiveCampaign";
import { fetchApartmentsRequest } from "../redux/actions/initialSearch";
import { fetchUserSignatures } from "../redux/actions/signature";
import {
  firebaseSignInGoogle,
  firebaseSignInFacebook
} from "../redux/actions/firebaseAuth";
import {
  firebaseAddSignatureToCampaign,
  firebaseRemoveSignatureFromCampaign
} from "../redux/actions/firebaseSignatures";
// COMPONENTS
import CampaignPage from "../components/ViewCampaign/CampaignPage";
import Loader from "../components/UtilComponents/FullScreenLoader";
import NotFound from "../components/UtilComponents/NotFound";

class CampaignContainer extends Component {
  state = {
    isNewCampaign: false
  };

  componentDidMount() {
    this.props.firebasePopulateCampaignById(this.props.params.id);
    // IF REDIRECTED FROM CREATE NEW CAMPAIGN ROUTER LOCATION WILL CONTAIN STATE OF ISNEWCAMPAIGN
    if (
      this.props.location.state &&
      this.props.location.state.isNewCampaign !== undefined
    ) {
      this.setState({ isNewCampaign: this.props.location.state.isNewCampaign });
    }
  }
  componentWillUpdate(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      nextProps.firebasePopulateCampaignById(nextProps.params.id);
    }
  }

  handleChangeIsNewCampaign = () => {
    this.setState({
      isNewCampaign: false
    });
  };

  render() {
    /* eslint-disable no-shadow */
    const {
      activeCampaign,
      auth,
      firebaseAddSignatureToCampaign,
      firebaseRemoveSignatureFromCampaign,
      firebaseSignInGoogle,
      firebaseSignInFacebook
    } = this.props;
    const { campaignId, error, loading, loaded } = activeCampaign;
    const hrefIsLocalhost = window.location.href
      .toLowerCase()
      .includes("localhost");
    const signCampaignProps = {
      auth,
      activeCampaign,
      firebaseAddSignatureToCampaign,
      firebaseRemoveSignatureFromCampaign,
      firebaseSignInGoogle,
      firebaseSignInFacebook
    };
    return (
      <div>
        {loading && <Loader />}
        {loaded && activeCampaign && error && <NotFound />}
        {loaded &&
          activeCampaign &&
          !error && (
            <CampaignPage
              handleChangeIsNewCampaign={this.handleChangeIsNewCampaign}
              signCampaignProps={signCampaignProps}
              isNewCampaign={this.state.isNewCampaign}
              activeCampaign={activeCampaign}
              hrefIsLocalhost={hrefIsLocalhost}
              campaignId={campaignId}
            />
          )}
      </div>
    );
  }
}

CampaignPage.defaultProps = {
  activeCampaign: PropTypes.shape({
    address: null,
    error: null,
    modifiedAt: null,
    createdAt: null,
    latLng: null,
    activeCampaignSigantures: [],
    isNewCampaign: false
  })
};

CampaignContainer.propTypes = {
  firebasePopulateCampaignById: PropTypes.func.isRequired,
  auth: PropTypes.shape({}).isRequired,
  activeCampaign: PropTypes.shape({
    activeCampaignSigantures: PropTypes.arrayOf(),
    address: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    error: PropTypes.string,
    isNewCampaign: PropTypes.bool,
    latLng: PropTypes.shape({
      _lat: PropTypes.number.isRequired,
      _long: PropTypes.number.isRequired
    }),
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    modifiedAt: PropTypes.instanceOf(Date)
  }).isRequired,
  firebaseAddSignatureToCampaign: PropTypes.func.isRequired,
  firebaseRemoveSignatureFromCampaign: PropTypes.func.isRequired,
  firebaseSignInGoogle: PropTypes.func.isRequired,
  firebaseSignInFacebook: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = ({
  activeCampaign,
  initialSearch,
  signature,
  auth
}) => ({
  activeCampaign,
  initialSearch,
  auth,
  userSignatures: {
    ...signature.userSignatures
  }
});

export default connect(mapStateToProps, {
  fetchUserSignatures,
  fetchApartmentsRequest,
  firebaseAddSignatureToCampaign,
  firebasePopulateCampaignById,
  firebaseSignInGoogle,
  firebaseSignInFacebook,
  firebaseRemoveSignatureFromCampaign
})(withRouter(CampaignContainer));
