import React from 'react';
import PropTypes from 'prop-types';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

const createCheckboxes = () => {
  const checkboxes = ['Keep me updated on this campaign'];
  if (this.props.auth._id) {
    return checkboxes.map(label => this.createCheckbox(label));
  }
  return <div />;
};

const RenderSignCampaign = ({ handleSignCampaign }) => (
  <form onSubmit={this.handleSignCampaign}>
    <FormGroup controlId="signingBecause">
      <ControlLabel id="control-label">
        <h4>I'm signing because...</h4>
      </ControlLabel>
      <FormControl
        className="form-resize-vertical"
        componentClass="textarea"
        placeholder="Optional"
      />
      {createCheckboxes}
      <div className="sign-campaign-actions">
        <Button
          className="remove-default sign-petition-button"
          value="submit"
          onClick={handleSignCampaign}
          block
        >
          Sign the petition
        </Button>
      </div>
    </FormGroup>
  </form>
);

RenderSignCampaign.propTypes = {
  handleSignCampaign: PropTypes.func.isRequired
};

export default RenderSignCampaign;
