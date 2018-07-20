import React from 'react';
import PropTypes from 'prop-types';
import RenderAddressHeading from './RenderAddressHeading';
import SubmitButton from './SubmitButton';

const RenderCampaignAlreadyExists = ({ exactMatchAddress, handleSelection }) => (
  <div>
    <RenderAddressHeading
      headingTitle={'Looks like this address already has a campaign. Is this your address?'}
      subTitle={exactMatchAddress}
    />
    <SubmitButton
      handleSelection={handleSelection}
      buttonText={'Yup! Sign me up!'}
      name={'EXISTING_CAMPAIGN'}
    />
  </div>
);

RenderCampaignAlreadyExists.propTypes = {
  exactMatchAddress: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired
};

export default RenderCampaignAlreadyExists;
