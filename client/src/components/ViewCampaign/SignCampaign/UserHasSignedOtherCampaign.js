import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router';

const UserHasSignedOtherCampaign = ({ signedCampaignId }) => (
  <div className="user-has-signed-other-campaign-alert">
    <Alert bsStyle="warning">
      <h4>You can only sign one campaign at a time.</h4>
      <p>Looks like you have already signed a campaign, you little overachiever you.</p>
      <Link to={`/campaign/${signedCampaignId}`}>
        <Button bsStyle="remove-default" className="user-has-signed-other-campaign-button" block>
          Go To My Campaign
        </Button>
      </Link>
    </Alert>
  </div>
);
UserHasSignedOtherCampaign.propTypes = {
  signedCampaignId: PropTypes.string.isRequired
};

export default UserHasSignedOtherCampaign;
