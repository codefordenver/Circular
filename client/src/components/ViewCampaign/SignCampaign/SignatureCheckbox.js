import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'react-bootstrap';

const SignatureCheckbox = ({ toggleKeepMeUpdatedCheckbox, keepMeUpdated, keepMeUpdatedLabel }) => (
  <FormGroup key={keepMeUpdatedLabel} className="text-center">
    <h4>
      <div className="checkbox">
        <label htmlFor="signatureCheckbox">
          <input
            id="signatureCheckbox"
            type="checkbox"
            name="KeepMeUpdated"
            checked={keepMeUpdated}
            onChange={toggleKeepMeUpdatedCheckbox}
          />
          {keepMeUpdatedLabel}
        </label>
      </div>
    </h4>
  </FormGroup>
);

SignatureCheckbox.propTypes = {
  toggleKeepMeUpdatedCheckbox: PropTypes.func.isRequired,
  keepMeUpdated: PropTypes.bool.isRequired,
  keepMeUpdatedLabel: PropTypes.string.isRequired
};

export default SignatureCheckbox;
