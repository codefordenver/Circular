import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'react-bootstrap';
import ToolList from '../ToolList';

const RenderRemoveSignaturePrompt = ({ handleRemoveSignature }) => (
  <div>
    <div className="text-center thanks-for-alert">
      <Alert bsStyle="success">
        <h4>Thanks for Signing!</h4>
      </Alert>
      <ToolList />
      <div className="text-center">
        <Button className="logout-button-signature" onClick={handleRemoveSignature} block>
          <i className="fa fa-times-circle" />
          Unsign This Campaign
        </Button>
      </div>
    </div>
  </div>
);

RenderRemoveSignaturePrompt.propTypes = {
  handleRemoveSignature: PropTypes.func.isRequired
};

export default RenderRemoveSignaturePrompt;
