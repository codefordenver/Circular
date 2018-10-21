import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

const Banner = props => (
  <Row className="banner-row">
    <Col xs={12}>
      <div className="banner-content">{props.children}</div>
    </Col>
  </Row>
);

Banner.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default Banner;
