import React from 'react';
import PropTypes from 'prop-types';
// import AddressHeading from './RenderAddressHeading';
// import SubmitButton from './SubmitButton';

const NearbyCampaigns = ({ nearbyCampaigns, selectedAddress }) => (
  <div>
    {/* <form>
      <AddressHeading headingTitle={'We found some campaigns nearby!'} />
      {nearbyCampaigns} {selectedAddress}
      <SubmitButton buttonText={'JOIN CAMPAIGN'} />
    </form> */}
  </div>
);

NearbyCampaigns.propTypes = {
  nearbyCampaigns: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedAddress: PropTypes.string.isRequired
};

export default NearbyCampaigns;
