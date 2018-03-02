import React from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';
import { Link } from 'react-router';

const PropManagerLinks = () => (
  <div>
    <Col xs={10} xsOffset={1} md={6} mdOffset={0}>
      <Row>
        <Col xs={12}>
          <PageHeader className="step-by-step-page-header">
            I'm a Property Manager, what can I do?
          </PageHeader>
        </Col>
        <Col xs={12} className="step-title">
          <h3>Provide sustainable waste management to your tenants! </h3>
        </Col>
        <Col xs={12} className="step-description">
          <p>
            Increase tenant satisfaction and boost your building's appeal by providing recycling
            service.
          </p>
          <br />
          <p>
            Please visit the page below to estimate your required level of service and tips on
            purchasing service.
          </p>
        </Col>
        <Col xs={12}>
          <Link to="/denver-recycling-info" className="info-footer">
            Tips ad Resources
          </Link>
        </Col>
      </Row>
    </Col>
  </div>
);

export default PropManagerLinks;
