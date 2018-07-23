import React from 'react';
import PropTypes from 'prop-types';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import SignatureCheckbox from './SignatureCheckbox';

const RenderSignCampaign = ({
  handleAddSignatureToCampaign,
  keepMeUpdated,
  keepMeUpdatedLabel,
  toggleKeepMeUpdatedCheckbox,
  signerMessage,
  updateSignerMessage
}) => (
  <form onSubmit={this.handleSignCampaign}>
    <FormGroup controlId="signingBecause">
      <ControlLabel id="control-label">
        <h4>I'm signing because...</h4>
      </ControlLabel>
      <FormControl
        className="form-resize-vertical"
        componentClass="textarea"
        placeholder="Optional"
        value={signerMessage}
        onChange={updateSignerMessage}
      />
      <SignatureCheckbox
        keepMeUpdated={keepMeUpdated}
        keepMeUpdatedLabel={keepMeUpdatedLabel}
        toggleKeepMeUpdatedCheckbox={toggleKeepMeUpdatedCheckbox}
      />
      <div className="sign-campaign-actions">
        <Button
          className="remove-default sign-petition-button"
          value="submit"
          onClick={handleAddSignatureToCampaign}
          block
        >
          Sign the petition
        </Button>
      </div>
    </FormGroup>
  </form>
);

RenderSignCampaign.defaultProps = {
  signerMessage: ''
};

RenderSignCampaign.propTypes = {
  handleAddSignatureToCampaign: PropTypes.func.isRequired,
  keepMeUpdated: PropTypes.bool.isRequired,
  keepMeUpdatedLabel: PropTypes.string.isRequired,
  toggleKeepMeUpdatedCheckbox: PropTypes.func.isRequired,
  signerMessage: PropTypes.string,
  updateSignerMessage: PropTypes.func.isRequired
};

export default RenderSignCampaign;
