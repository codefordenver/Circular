import React from 'react';
import { Grid, Col } from 'react-bootstrap';
import { Link } from 'react-router';

const Footer = () => (
  <Grid fluid className="footer-container">
    <Col xs={12}>
      <Link className="footer-link" to="/privacy-policy">
        Privacy Policy
      </Link>
    </Col>
  </Grid>
);

export default Footer;
