import React from 'react';
import { Link } from 'react-router';
import { Row, Col, PageHeader } from 'react-bootstrap';

const RecyclingInfo = () => (
  <div>
    <Col xs={10} xsOffset={1} md={6} mdOffset={0}>
      <div>
        <PageHeader className="home-section-page-header">Wait, But Why?</PageHeader>
      </div>
      <div>
        <h3 className="home-section-title">
          Denver's recycling rate is only 20%, while the national average is 35%.
        </h3>
        <p className="home-section-description">
          The City of Denver only provides recycling service to single-family residential homes and
          buildings with seven or fewer units. Furthermore, multi-family building managers are not
          mandated to provide recycling service, but you and your neighbors can request recycling
          service from your landlord today!
        </p>
      </div>
      <div>
        <Link to="/property-owner-faq" className="home-section-link">
          Learn More
        </Link>
      </div>
    </Col>
  </div>
);

export default RecyclingInfo;
