import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SubmitButton = ({ buttonText, handleSelection, name }) => (
  <Row>
    <Col xs={12}>
      <Button
        bsStyle="remove-default"
        className="join-campaign-button"
        type="submit"
        name={name}
        onClick={handleSelection}
        block
      >
        {buttonText} <i className="fa fa-arrow-right" />
      </Button>
    </Col>
  </Row>
);

SubmitButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default SubmitButton;
