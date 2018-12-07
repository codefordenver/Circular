import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

const TenantOrPMChoice = () => (
  <Grid className="tenant-or-pm-section">
    <Row>
      <Col xs={12} lg={10} lgOffset={1}>
        <div>
          <h2>Ready? Let's improve recycling together!</h2>
        </div>
      </Col>
    </Row>
    <Row>
      <Col xs={12} lg={10} lgOffset={1}>
        <div>
          <p>
            You deserve convenient recycling. Apartment or condo managers are not required to
            provide recycling services for residents, but there is something you can do. Organize
            your neighbors and request recycling from your buliding manager. Together we can make
            Denver a sustainability leader!
          </p>
        </div>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <div className="buttons-wrapper">
          <div>
            <Link to="how-does-this-work">I'm a tenant</Link>
            <Link to="manager-resources">I'm a property manager</Link>
          </div>
        </div>
      </Col>
    </Row>
  </Grid>
);

export default TenantOrPMChoice;
