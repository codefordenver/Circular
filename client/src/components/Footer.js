import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

const Footer = () => (
  <Grid fluid className="footer-container">
    <Row>
      <Col xs={12}>
        <Link className="footer-link" to="/privacy-policy">
          Privacy Policy
        </Link>
      </Col>
    </Row>
  </Grid>
);

export default Footer;
