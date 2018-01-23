/* eslint-disable react/prop-types, no-shadow, no-console */ /* - TODO: Fix and remove this line */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createCampaign } from '../redux/actions/newCampaign';

const CreateCampaignStep3 = (props) => {
  const { createCampaign, newCampaign, router } = props;

  const makeNewCampaign = async (e) => {
    e.preventDefault();
    console.log('newCampaign:', newCampaign);
    const { response } = await createCampaign(newCampaign);
    router.push(`/campaign/${response.data._id}`);
  };

  return (
    <div className="add_address_wrapper">
      <h1>{'Last step!'}</h1>
      <h2>{'Sign your own petition to activate your new campaign!'}</h2>
      <button className="btn btn-primary fr" onClick={makeNewCampaign}>
        {'Activate your Campaign'}
      </button>
      <Link to="/new-campaign/optional-info">{'⬅ Back'}</Link>
    </div>
  );
};

export default connect(({ activeCampaign, newCampaign }) => ({ activeCampaign, newCampaign }), {
  createCampaign
})(CreateCampaignStep3);
