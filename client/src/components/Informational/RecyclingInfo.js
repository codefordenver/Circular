import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Col, PageHeader } from 'react-bootstrap';

const RecyclingInfo = () => (
  <Col xs={10} xsOffset={1} md={6} mdOffset={0} className="recycling-info-wrapper">
    <div className="home-section-div">
      <PageHeader className="home-section-page-header">
        Denver's recycling rate is only 23%, while the national average is 35%.
      </PageHeader>
      <p className="home-section-description">
        The City of Denver only provides recycling service to single-family residential homes and
        buildings with seven or fewer units. Furthermore, multi-family building managers are not
        mandated to provide recycling service, but you and your neighbors can request recycling
        service from your landlord today!
      </p>
      <LinkContainer to="/denver-learn-more">
        <Link className="home-section-link">LEARN MORE</Link>
      </LinkContainer>
    </div>
  </Col>
);

export default RecyclingInfo;
