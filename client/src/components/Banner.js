import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Banner = props => (
  <Row className="banner-row">
    <Col xs={12}>
      <div className="banner-content">{props.children}</div>
    </Col>
  </Row>
  );
export default Banner;
