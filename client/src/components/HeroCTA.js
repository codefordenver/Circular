import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import AutoSuggestInput from './AutoSuggestInput';

const HeroCTA = ({
  openMap,
  firebaseSearchAddressFlow,
  clearInitialSearchResults,
  firebaseCampaigns,
  router
}) => (
  <Grid fluid>
    <div className="tinted" />
    <Row className="hero-wrapper">
      <Col className="hero-page-header" xs={12}>
        <div className="opacity-div">
          <h1>NEED RECYCLING?</h1>
          <h2 className="font-italic">Recruit, Request, Recycle</h2>
          <Row>
            <Col xs={10} xsOffset={1}>
              <h3>
                We have a mission to change Denver's low recycling rate by making it easy for you
                and your neighbors to petition your landlord for recyling for your building.
              </h3>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
    <Row>
      <Col xs={12} className="hero-search">
        <form>
          <AutoSuggestInput
            firebaseSearchAddressFlow={firebaseSearchAddressFlow}
            clearInitialSearchResults={clearInitialSearchResults}
            firebaseCampaigns={firebaseCampaigns}
            router={router}
          />
          <div className="text-center">
            <Button className="map-btn" bsStyle="as-link" onClick={openMap}>
              Explore Nearby Campaigns
            </Button>
          </div>
        </form>
      </Col>
    </Row>
  </Grid>
);

HeroCTA.propTypes = {
  openMap: PropTypes.func.isRequired,
  clearInitialSearchResults: PropTypes.func.isRequired,
  firebaseCampaigns: PropTypes.shape({}).isRequired,
  firebaseSearchAddressFlow: PropTypes.func.isRequired,
  router: PropTypes.shape({}).isRequired
};

export default HeroCTA;
