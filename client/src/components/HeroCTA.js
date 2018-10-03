import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';

const HeroCTA = ({
  openMap,
  firebaseSearchAddressFlow,
  clearInitialSearchResults,
  firebaseCampaigns,
  router
}) => (
  <Grid fluid>
    <div className="hero-wrapper">
      <div className="hero-page-header">
        <div className="opacity-div">
          <h1>NEED RECYCLING IN YOUR APARTMENT OR CONDO?</h1>
          <h2 className="font-italic">Recruit, Request, Recycle</h2>
        </div>
      </div>
    </div>
  </Grid>
);

HeroCTA.propTypes = {
  openMap: PropTypes.func, // .isRequired,
  clearInitialSearchResults: PropTypes.func, // .isRequired,
  firebaseCampaigns: PropTypes.shape({}), // .isRequired,
  firebaseSearchAddressFlow: PropTypes.func, // .isRequired,
  router: PropTypes.shape({}) // .isRequired
};

export default HeroCTA;
