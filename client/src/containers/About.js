import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

const About = () => (
  <Grid fluid>
    <Row>
      <Col xs={12} md={10} mdOffset={1}>
        <PageHeader className="about-page-header-overrides">About</PageHeader>
        <p className="about-text">
          Denver recycles 18% and composts 2%. Leading cities like San Fransisco are diverting as
          high as 80% while Denver is falling behind with only diverting 20%.
        </p>
        <p className="about-text">
          Denverites believe they can do better! As a tenant in a Denver Multi-Family Complex (MFC)
          with 8 or more units, your property manager or landlord is NOT required to provide you
          recycling or composting waste services. Many tenants in Denver have resorted to illegally
          dumping their recyclables in a neighbor’s recycling dumpster, or driving out of their way
          to a transfer station or parent’s home.
        </p>
        <p className="about-text">
          It’s time to organize and request better waste services from property managers in Denver.
          There’s power in numbers, by participating and gathering momentum with the Denver
          Recycling Request tool, property managers know this is important to you and your
          neighbors.
        </p>
      </Col>
    </Row>
  </Grid>
);

export default About;
