import React from 'react';
import { Grid, Col } from 'react-bootstrap';
import { Link } from 'react-router';

const Footer = () => (
  <Grid fluid className="footer-container">
    <Col xs={12}>
      <a href="mailto:jasmin@ecocycle.org">
        <p>Questions? Reach out to us!</p>
      </a>
      <i className="fa fa-copyright" />
      2018 Eco-Cycle Inc & Code for Denver | All Rights Reserved |
      <Link to="/privacy-policy" className="footer-link">
        Privacy Policy
      </Link>
    </Col>
  </Grid>
);

export default Footer;
