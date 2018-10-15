import React from 'react';
import { Grid, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

const Footer = () => (
  <Grid fluid className="footer-container">
    <Col xs={12}>
      <a href="mailto:jasmin@ecocycle.org">
        <p>Questions? Reach out to us!</p>
      </a>
      <i className="fa fa-copyright" />
      2018 Eco-Cycle Inc & Code for Denver | All Rights Reserved |
      <LinkContainer to="/privacy-policy">
        <Link className="footer-link">Privacy Policy</Link>
      </LinkContainer>
    </Col>
  </Grid>
);

export default Footer;
