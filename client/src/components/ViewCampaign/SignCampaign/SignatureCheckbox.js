import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'react-bootstrap';

const SignatureCheckbox = ({
  className,
  keepMeUpdated,
  keepMeUpdatedLabel,
  toggleKeepMeUpdatedCheckbox
}) => (
  <FormGroup key={keepMeUpdatedLabel} className="text-center">
    <h4>
      <div className="checkbox">
        <label className={className ? `${className}` : ''} htmlFor="signatureCheckbox">
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
  className: PropTypes.string.isRequired,
  keepMeUpdated: PropTypes.bool.isRequired,
  keepMeUpdatedLabel: PropTypes.string.isRequired,
  toggleKeepMeUpdatedCheckbox: PropTypes.func.isRequired
};

export default SignatureCheckbox;
