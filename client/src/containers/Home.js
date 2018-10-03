import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import HeroCTA from '../components/HeroCTA';
// import CampaignsMap from '../components/CampaignsMap';
import StepByStep from '../components/StepByStep';
// import InfoAndLinks from '../components/Informational/InfoAndLinks';
import Footer from '../components/Footer/Footer';
import RecyclingInfo from '../components/Informational/RecyclingInfo';
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
          <RecyclingInfo />
          <Banner>
            <div>
              <strong>Most Denver apartments don't have recycling on site.</strong>
            </div>
            <div>We can help you get recycling at your building.</div>
          </Banner>
        </Grid>
        <StepByStep />
        <Grid className="call-to-action-section">
          <Row>
            <Col xs={12} lg={10} lgOffset={1}>
              <div>
                <h2>Ready? Let's improve recycling together!</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={10} lgOffset={1}>
              <div>
                <p>
                  You deserve convenient recycling. Apartment or condo managers are not required to
                  provide recycling services for residents, but there is something you can do.
                  Organize your neighbors and request recycling from your buliding manager. Together
                  we can make Denver a sustainability leader!
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="buttons-wrapper">
                <div>
                  <Link to="how-does-this-work">I'm a tenant</Link>
                  <Link to="how-does-this-work">I'm a property manager</Link>
                </div>
              </div>
            </Col>
          </Row>
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
