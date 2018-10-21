import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeroCTA from '../components/HeroCTA';
// import CampaignsMap from '../components/CampaignsMap';
import StepByStep from '../components/StepByStep';
import TenantOrPMChoice from '../components/TenantOrPMChoice';
import Footer from '../components/Footer/Footer';
import Banner from '../components/Banner';

import {
  firebaseSearchAddressFlow,
  clearInitialSearchResults
} from '../redux/actions/firebaseInitialSearch';
import { openMap, closeMap } from '../redux/actions/googleMap';

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
        <HeroCTA />
        <Grid>
          <Banner>
            <div>
              <strong>Most Denver apartments don't have recycling on site.</strong>
            </div>
            <div>We can help you get recycling at your building.</div>
          </Banner>
        </Grid>
        <StepByStep />
        <TenantOrPMChoice />
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
