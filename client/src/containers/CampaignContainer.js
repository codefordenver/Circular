import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// ACTIVE CAMPAIGN FUNCTIONS
import { firebasePopulateCampaignById } from '../redux/actions/firebaseActiveCampaign';
// AUTH FUNCTIONS
import { firebaseSignInGoogle, firebaseSignInFacebook } from '../redux/actions/firebaseAuth';
// SIGNATURE FUNCTIONS
import {
  firebaseAddSignatureToCampaign,
  firebaseRemoveSignatureFromCampaign
} from '../redux/actions/firebaseSignatures';
// CAMPAIGN UPATES
import { firebaseUpdateCampaign } from '../redux/actions/firebaseCampaigns';
// WASTE PROVIDERS
import { firebaseFetchWasteProviders } from '../redux/actions/firebaseWasteProviders';
// COMPONENTS
import CampaignPage from '../components/ViewCampaign/CampaignPage';
import Loader from '../components/UtilComponents/FullScreenLoader';
import NotFound from '../components/UtilComponents/NotFound';

class CampaignContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNewCampaign: false
    };
  }

  componentDidMount() {
    if (!this.props.firebaseWasteProviders.firebaseWasteProviders) {
      this.props.firebaseFetchWasteProviders();
    }
    this.props.firebasePopulateCampaignById(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.state &&
      nextProps.location.state.isNewCampaign !== undefined &&
      nextProps.location.state.isNewCampaign !== this.state.isNewCampaign
    ) {
      this.setState(() => ({
        isNewCampaign: nextProps.location.state.isNewCampaign
      }));
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
      firebaseSignInFacebook,
      firebaseWasteProviders
    } = this.props;
    const { campaignId, error, loading, loaded } = activeCampaign;
    const hrefIsLocalhost = window.location.href.toLowerCase().includes('localhost');
    const signCampaignProps = {
      auth,
      activeCampaign,
      firebaseAddSignatureToCampaign,
      firebaseRemoveSignatureFromCampaign,
      firebaseSignInGoogle,
      firebaseSignInFacebook,
      firebaseUpdateCampaign,
      firebaseWasteProviders
    };
    return (
      <div>
        {loading && <Loader />}
        {loaded && activeCampaign && error && <NotFound />}
        {loaded && activeCampaign && !error && (
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
    activeCampaignSigantures: [],
    address: null,
    createdAt: null,
    error: null,
    isNewCampaign: false,
    latLng: null,
    modifiedAt: null
  }),
  firebaseWasteProviders: {
    loading: false,
    loaded: false,
    firebaseWasteProviders: []
  }
};

CampaignContainer.propTypes = {
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
  firebaseFetchWasteProviders: PropTypes.func.isRequired,
  firebasePopulateCampaignById: PropTypes.func.isRequired,
  firebaseRemoveSignatureFromCampaign: PropTypes.func.isRequired,
  firebaseSignInGoogle: PropTypes.func.isRequired,
  firebaseSignInFacebook: PropTypes.func.isRequired,
  firebaseWasteProviders: PropTypes.shape({
    firebaseWasteProviders: PropTypes.arrayOf()
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      isNewCampaign: PropTypes.bool
    })
  }).isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = ({
  activeCampaign,
  auth,
  firebaseWasteProviders,
  initialSearch,
  signature
}) => ({
  activeCampaign,
  auth,
  firebaseWasteProviders,
  initialSearch,
  userSignatures: {
    ...signature.userSignatures
  }
});

export default connect(
  mapStateToProps,
  {
    firebaseAddSignatureToCampaign,
    firebaseFetchWasteProviders,
    firebasePopulateCampaignById,
    firebaseRemoveSignatureFromCampaign,
    firebaseSignInGoogle,
    firebaseSignInFacebook,
    firebaseUpdateCampaign
  }
)(withRouter(CampaignContainer));
