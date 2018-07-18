import React from 'react';
import PropTypes from 'prop-types';
import RenderAddressHeading from './RenderAddressHeading';
import SubmitButton from './SubmitButton';

const RenderCampaignAlreadyExists = ({ exactMatchAddress, onClick }) => (
  <div>
    <RenderAddressHeading
      headingTitle={'Looks like this address already has a campaign. Is this your address?'}
      subTitle={exactMatchAddress}
    />
    <SubmitButton onClick={onClick} buttonText={'Yup! Sign me up!'} />
  </div>
);

RenderCampaignAlreadyExists.propTypes = {
  exactMatchAddress: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default RenderCampaignAlreadyExists;
