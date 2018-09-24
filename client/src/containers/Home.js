import React, { Component } from 'react';
import { Link } from 'react-router';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeroCTA from '../components/HeroCTA';
import CampaignsMap from '../components/CampaignsMap';
import StepByStep from '../components/StepByStep';
import InfoAndLinks from '../components/Informational/InfoAndLinks';
import Footer from '../components/Footer/Footer';
import Steps from '../components/HowItWorks/Steps';
import {
  firebaseSearchAddressFlow,
  clearInitialSearchResults
} from '../redux/actions/firebaseInitialSearch';
import { openMap, closeMap } from '../redux/actions/googleMap';

import CircularProgressBar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    /* eslint no-shadow: */
    const {
      firebaseCampaigns,
      firebaseSearchAddressFlow,
      googleMap: { isOpen },
      router
    } = this.props;
    const { campaigns } = firebaseCampaigns;
    return (
      <div>
        <HeroCTA
          openMap={this.props.openMap}
          firebaseSearchAddressFlow={firebaseSearchAddressFlow}
          clearInitialSearchResults={clearInitialSearchResults}
          firebaseCampaigns={firebaseCampaigns}
          router={router}
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

Home.defaultProps = {
  firebaseCampaigns: PropTypes.shape({
    campaigns: PropTypes.arrayOf()
  })
};

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
    )
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
    clearInitialSearchResults,
    openMap,
    closeMap
  }
)(Home);
