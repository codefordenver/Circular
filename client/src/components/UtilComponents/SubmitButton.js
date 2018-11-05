import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SubmitButton = ({ buttonText, handleSelection, name, faArrowDirection, disabled }) => (
  <Row>
    <Col xs={12}>
      <Button
        bsStyle="remove-default"
        className="join-campaign-button"
        type="submit"
        name={name}
        onClick={handleSelection}
        block
        disabled={disabled}
      >
        {faArrowDirection === 'left' && <i className={`fa fa-arrow-${faArrowDirection}`} />}
        {buttonText}
        {'   '}
        {faArrowDirection === 'right' && <i className={`fa fa-arrow-${faArrowDirection}`} />}
      </Button>
    </Col>
  </Row>
);

SubmitButton.defaultProps = {
  faArrowDirection: 'right'
};

SubmitButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleSelection: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  faArrowDirection: PropTypes.string
};

export default SubmitButton;
