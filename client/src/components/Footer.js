import React from 'react';
import { Grid, Col } from 'react-bootstrap';
import { Link } from 'react-router';

const Footer = () => (
  <Grid fluid className="footer-container">
    <Col xs={12}>
      <p>Questions? Reach out to us!</p>
      <i className="fa fa-copyright" />
      2018 Eco-Cycle Inc & Code for Denver | All Rights Reserved |
      <Link className="footer-link" to="/privacy-policy">
        Privacy Policy
      </Link>
    </Col>
  </Grid>
);

export default Footer;
