import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SubmitButton = ({ buttonText, handleFormSubmit }) => (
  <Row>
    <Col xs={12}>
      <Button
        bsStyle="remove-default"
        className="join-campaign-button"
        type="submit"
        onClick={handleFormSubmit}
        block
      >
        {buttonText} <i className="fa fa-arrow-right" />
      </Button>
    </Col>
  </Row>
);

SubmitButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleFormSubmit: PropTypes.func.isRequired
};

export default SubmitButton;
