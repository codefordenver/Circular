import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import AutoSuggestInput from './AutoSuggestInput';

const HeroCTA = ({
  openMap,
  firebaseSearchAddressFlow,
  firebaseStashAddress,
  clearSearchResults,
  firebaseCampaigns,
  router
}) => (
  <Grid fluid>
    <div className="tinted" />
    <Row className="hero-wrapper">
      <Col xs={12}>
        <h1 className="hero-page-header">
          NEED RECYCLING
          <br />
          <span className="font-italic">-in-</span>
          <br />
          YOUR BUILDING?
        </h1>
      </Col>
    </Row>
    <Row>
      <Col xs={12} className="hero-search">
        <form>
          <AutoSuggestInput
            firebaseSearchAddressFlow={firebaseSearchAddressFlow}
            firebaseStashAddress={firebaseStashAddress}
            clearSearchResults={clearSearchResults}
            firebaseCampaigns={firebaseCampaigns}
            router={router}
          />
          <div className="text-center">
            <Button bsStyle="as-link" onClick={openMap}>
              Explore the map
            </Button>
            <p className="vertical-text-divider">|</p>
            <Link className="home-section-link" to="/denver-recycling-info">
              Learn more first
            </Link>
          </div>
        </form>
      </Col>
    </Row>
  </Grid>
);

HeroCTA.propTypes = {
  openMap: PropTypes.func.isRequired,
  clearSearchResults: PropTypes.func.isRequired,
  firebaseCampaigns: PropTypes.shape({}).isRequired,
  firebaseSearchAddressFlow: PropTypes.func.isRequired,
  router: PropTypes.shape({}).isRequired
};

export default HeroCTA;
