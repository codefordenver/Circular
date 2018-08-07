import React from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, FormControl, FormGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

const wasteProviderToolTip = (
  <Tooltip id="tooltip">
    Normally there is a logo on the trash bin where you can find out who your waste service provider
    is!
  </Tooltip>
);

const UpdateWasteProvider = ({ handleWasteProviderChange, wasteProviders }) => (
  <FormGroup name="wasteProviders" controlId="wasteProviders">
    <OverlayTrigger placement="right" overlay={wasteProviderToolTip}>
      <ControlLabel>
        Update Waste Provider{' '}
        <span role="img" aria-label="info to find waste provider">
          {' '}
          ℹ️
        </span>
      </ControlLabel>
    </OverlayTrigger>
    <FormControl
      onChange={handleWasteProviderChange}
      componentClass="select"
      placeholder="Choose Your Current Waste Provider"
    >
      <option>Select Your Provider</option>
      {wasteProviders.map(provider => (
        <option key={provider.id} value={provider.name} id={provider.id}>
          {provider.name}
        </option>
      ))}
    </FormControl>
  </FormGroup>
);

UpdateWasteProvider.defaultProps = {
  wasteProviders: [
    {
      email: '',
      id: '',
      name: '',
      phone: ''
    }
  ]
};

UpdateWasteProvider.propTypes = {
  handleWasteProviderChange: PropTypes.func.isRequired,
  wasteProviders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      placeHolder: PropTypes.string,
      label: PropTypes.string
    })
  )
};

export default UpdateWasteProvider;
