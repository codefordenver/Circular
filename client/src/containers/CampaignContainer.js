import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import fetchCampaignById from '../redux/actions/activeCampaign';
import { firebasePopulateCampaignById } from '../redux/actions/firebaseActiveCampaign';
import { fetchApartmentsRequest } from '../redux/actions/initialSearch';
import { fetchUserSignatures } from '../redux/actions/signature';
import {
  firebaseSignInGoogle,
  firebaseSignInFacebook,
  firebaseSignOut
} from '../redux/actions/firebaseAuth';
// COMPONENTS
import CampaignPage from '../components/ViewCampaign/CampaignPage';
import Loader from '../components/UtilComponents/FullScreenLoader';
import NotFound from '../components/UtilComponents/NotFound';

class CampaignContainer extends Component {
  componentDidMount() {
    this.props.firebasePopulateCampaignById(this.props.params.id);
  }
  componentWillUpdate(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      nextProps.fetchCampaignById(nextProps.params.id);
    }
  }

  render() {
    const { activeCampaign, auth } = this.props;
    const { loading, loaded, error, campaignId } = activeCampaign;
    const hrefIsLocalhost = window.location.href.toLowerCase().includes('localhost');
    const signCampaignProps = {
      auth,
      activeCampaign,
      firebaseSignInGoogle,
      firebaseSignInFacebook,
      firebaseSignOut
    };
    return (
      <div>
        <button onClick={firebaseSignInGoogle}>signin </button>
        {loading && <Loader />}
        {loaded && activeCampaign && error && <NotFound />}
        {loaded &&
          activeCampaign &&
          !error && (
            <CampaignPage
              testFire={testFire}
              firebaseSignInGoogle={firebaseSignInGoogle}
              signCampaignProps={signCampaignProps}
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
    latLng: null
  })
};

CampaignContainer.propTypes = {
  firebasePopulateCampaignById: PropTypes.func.isRequired,
  auth: PropTypes.shape({}).isRequired,
  activeCampaign: PropTypes.shape({
    address: PropTypes.string,
    modifiedAt: PropTypes.instanceOf(Date).isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    latLng: PropTypes.shape({
      _lat: PropTypes.number.isRequired,
      _long: PropTypes.number.isRequired
    }),
    error: PropTypes.string,
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  }).isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = ({ activeCampaign, initialSearch, signature, auth }) => ({
  activeCampaign,
  initialSearch,
  auth,
  userSignatures: {
    ...signature.userSignatures
  }
});

export default connect(mapStateToProps, {
  firebaseSignInGoogle,
  firebasePopulateCampaignById,
  fetchUserSignatures,
  fetchApartmentsRequest
})(withRouter(CampaignContainer));
