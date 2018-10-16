import React from 'react';
import { Col, PageHeader } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

const PropManagerLinks = () => (
  <Col xs={10} xsOffset={1} md={6} mdOffset={0} className="property-manager-links-wrapper">
    <div className="home-section-div">
      <PageHeader className="home-section-page-header">Property Manager</PageHeader>

      <p className="home-section-description">
        Provide sustainable waste management to your tenants! Increase tenant satisfaction and boost
        your building's appeal by providing recycling service. Please visit the page below to
        estimate your required level of service and tips on purchasing service.
      </p>
      <LinkContainer to="/manager-resources">
        <Link className="home-section-link">TIPS AND RESOURCES</Link>
      </LinkContainer>
    </div>
  </Col>
);

export default PropManagerLinks;
