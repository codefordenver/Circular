import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

const RecyclingInfo = () => (
  <Grid fluid>
    <Row>
      <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
        <Row>
          <Col xs={12}>
            <PageHeader className="step-by-step-page-header">Wait, But Why?</PageHeader>
          </Col>
          <Col xs={12}>
            <h3 className="step-title">
              Denver's recycling rate is only 20%, while the national average is 35%.
            </h3>
            <p className="step-description">
              The City of Denver only provides recycling service to single-family residential homes
              and buildings with seven or fewer units. Furthermore, multi-family building managers
              are not mandated to provide recycling service, but you and your neighbors can request
              recycling service from your landlord today!
            </p>
          </Col>
          <Col xs={12}>
            <Link to="/property-owner-faq" className="info_footer">
              Learn More
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  </Grid>
  /*


  </div>
  */
);

export default RecyclingInfo;
