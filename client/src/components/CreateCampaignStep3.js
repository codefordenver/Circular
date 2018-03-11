/* eslint-disable react/prop-types, no-shadow, no-console */ /* - TODO: Fix and remove this line */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createCampaign } from '../redux/actions/newCampaign';
import { Button, PageHeader } from 'react-bootstrap';

const CreateCampaignStep3 = props => {
  const { createCampaign, newCampaign, router } = props;

  const makeNewCampaign = async e => {
    e.preventDefault();
    console.log('newCampaign:', newCampaign);
    const { response } = await createCampaign(newCampaign);
    router.push(`/campaign/${response.data._id}`);
  };

  return (
    <div>
      <PageHeader>{'Last step!'}</PageHeader>
      <h2 className="text-center">{'Sign your own petition to activate your new campaign!'}</h2>
      <br />
      <Button className="next-button fr" onClick={makeNewCampaign}>
        Activate your Campaign
      </Button>
      <Link className="btn next-button fl" to="/new-campaign/optional-info">
        Back
      </Link>
    </div>
  );
};

export default connect(({ activeCampaign, newCampaign }) => ({ activeCampaign, newCampaign }), {
  createCampaign
})(CreateCampaignStep3);
