import React from 'react';
import { Col, PageHeader } from 'react-bootstrap';
import { Link } from 'react-router';

const PropManagerLinks = () => (
  <Col xs={10} xsOffset={1} md={6} mdOffset={0} className="home-section-container">
    <div>
      <PageHeader className="home-section-page-header">
        I'm a Property Manager, what can I do?
      </PageHeader>
    </div>
    <div className="home-section-title">
      <h3>Provide sustainable waste management to your tenants! </h3>
    </div>
    <div className="home-section-description">
      <p>
        Increase tenant satisfaction and boost your building's appeal by providing recycling
        service.
      </p>
      <br />
      <p>
        Please visit the page below to estimate your required level of service and tips on
        purchasing service.
      </p>
    </div>
    <div>
      <Link to="/manager-resources" className="home-section-link">
        Tips and Resources
      </Link>
    </div>
  </Col>
);

export default PropManagerLinks;
