import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router';

const RenderUserHasSignedOtherCampaign = ({ campaignID }) => (
  <div className="user-has-signed-other-campaign-alert">
    <Alert bsStyle="warning">
      <h4>You can only sign one campaign at a time.</h4>
      <p>Looks like you have already signed a campaign, you little overachiever you.</p>
      <Button bsStyle="remove-default" className="user-has-signed-other-campaign-button" block>
        <Link to={`/campaign/${campaignID}`}>Go To My Campaign</Link>
      </Button>
    </Alert>
  </div>
);
RenderUserHasSignedOtherCampaign.propTypes = {
  campaignID: PropTypes.string.isRequired
};

export default RenderUserHasSignedOtherCampaign;
