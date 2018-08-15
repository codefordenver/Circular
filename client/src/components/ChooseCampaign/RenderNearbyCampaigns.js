import React from 'react';
import PropTypes from 'prop-types';
// import RenderAddressHeading from './RenderAddressHeading';
// import SubmitButton from './SubmitButton';

const RenderNearbyCampaigns = ({ nearbyCampaigns, selectedAddress }) => (
  <div>
    {/* <form>
      <RenderAddressHeading headingTitle={'We found some campaigns nearby!'} />
      {nearbyCampaigns} {selectedAddress}
      <SubmitButton buttonText={'JOIN CAMPAIGN'} />
    </form> */}
  </div>
);

RenderNearbyCampaigns.propTypes = {
  nearbyCampaigns: PropTypes.arrayOf().isRequired,
  selectedAddress: PropTypes.string.isRequired
};

export default RenderNearbyCampaigns;
