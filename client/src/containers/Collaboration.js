import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

const Collaboration = () => (
  <Grid fluid>
    <Row>
      <Col xs={12} md={10} mdOffset={1}>
        <PageHeader className="about-page-header-overrides">Who Are We</PageHeader>
        <p className="about-text">
          <a className="about-link" href="https://www.codefordenver.org/">
            Code For Denver
          </a>{' '}
          is volunteer-driven, community outreach that improves people’s lives through technology.
        </p>
        <p className="about-text">
          <a className="about-link" href="https://www.ecocycle.org">
            Eco-Cycle
          </a>{' '}
          is a Zero Waste non-profit based in Boulder Colorado. They started working in Denver in
          2016 as a commitment at the Denver Sustainable Summit to increase Denver’s diversion rate
          to 34%.
        </p>
      </Col>
    </Row>
  </Grid>
);

export default Collaboration;
