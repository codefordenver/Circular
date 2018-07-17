import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeroCTA from '../components/HeroCTA';
import CampaignsMap from '../components/CampaignsMap';
import StepByStep from '../components/StepByStep';
import InfoAndLinks from '../components/InfoAndLinks';
import Footer from '../components/Footer';
import {
  firebaseSearchAddressFlow,
  clearSearchResults
} from '../redux/actions/firebaseInitialSearch';
// import { firebaseCreateNewCampaign } from '../redux/actions/firebaseActiveCampaign';
import { openMap, closeMap } from '../redux/actions/googleMap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { firebaseCampaigns, googleMap: { isOpen }, firebaseSearchAddressFlow } = this.props;
    const { campaigns } = firebaseCampaigns;
    return (
      <div>
        <HeroCTA
          openMap={this.props.openMap}
          firebaseSearchAddressFlow={firebaseSearchAddressFlow}
          clearSearchResults={clearSearchResults}
          firebaseCampaigns={firebaseCampaigns}
          router={this.props.router}
        />
        <CampaignsMap isOpen={isOpen} markers={campaigns} closeMap={this.props.closeMap} />
        <Grid fluid className="home-section-container">
          <StepByStep />
          <InfoAndLinks />
        </Grid>
        <Footer />
      </div>
    );
  }
}

Home.propTypes = {
  firebaseSearchAddressFlow: PropTypes.func.isRequired,
  firebaseCampaigns: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    campaigns: PropTypes.arrayOf(
      PropTypes.shape({
        address: PropTypes.string.isRequired,
        campaignId: PropTypes.string.isRequired,
        createdAt: PropTypes.shape({}).isRequired,
        latLng: PropTypes.shape({
          _lat: PropTypes.number.isRequired,
          _long: PropTypes.number.isRequired
        }).isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  googleMap: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired
  }).isRequired,
  openMap: PropTypes.func.isRequired,
  closeMap: PropTypes.func.isRequired,
  router: PropTypes.shape({}).isRequired
};

export default connect(
  ({ initialSearch, googleMap, firebaseCampaigns }) => ({
    ...initialSearch,
    googleMap,
    firebaseCampaigns
  }),
  {
    firebaseSearchAddressFlow,
    clearSearchResults,
    openMap,
    closeMap
  }
)(Home);
