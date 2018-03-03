import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';

import AutoSuggestInput from './AutoSuggestInput';

const HeroCTA = ({ openMap }) => (
  <Grid fluid>
    <div className="tinted" />
    <Row className="hero-wrapper">
      <Col xs={12}>
        <h1 className="hero-page-header">
          NEED RECYCLING
          <br />
          <span className="italics">-in-</span>
          <br />
          YOUR BUILDIND?
        </h1>
      </Col>
    </Row>
    <Row>
      <Col xs={12} className="mt-nug">
        <form>
          <AutoSuggestInput />
          <Link className="home-section-link" to="/denver-recycling-info">
            Learn more first
          </Link>
        </form>
      </Col>
    </Row>
  </Grid>
  /*
  <button className="open_map_button" onClick={openMap}>
    Explore The Map
  </button>
  */
);

HeroCTA.propTypes = {
  openMap: PropTypes.func.isRequired
};

export default HeroCTA;
