import React from 'react';
import PropTypes from 'prop-types';

const RenderCampaignAlreadyExists = ({ exactMatchAddress, onClick }) => (
  <form>
    <h3> Looks like this address already has a campaign, is this your address? </h3>
    <h4>{exactMatchAddress}</h4>
    <button onClick={onClick}>Yup! Sign me up! </button>
  </form>
);

RenderCampaignAlreadyExists.propTypes = {
  exactMatchAddress: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default RenderCampaignAlreadyExists;
