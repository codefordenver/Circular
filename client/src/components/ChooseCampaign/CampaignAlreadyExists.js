import React from 'react';
import PropTypes from 'prop-types';
import AddressHeading from './AddressHeading';
import SubmitButton from './SubmitButton';

const CampaignAlreadyExists = ({ exactMatchAddress, handleSelection }) => (
  <div>
    <AddressHeading
      headingTitle={'Looks like this address already has a campaign. Is this your address?'}
      subTitle={exactMatchAddress}
    />
    <SubmitButton
      handleSelection={handleSelection}
      buttonText={'Yup! Show Me!'}
      name={'EXISTING_CAMPAIGN'}
    />
    <div style={{ marginTop: '1em' }} />
    <SubmitButton
      handleSelection={handleSelection}
      buttonText={'Nope, Take Me Back'}
      name={'GO BACK'}
      faArrowDirection={'left'}
    />
  </div>
);

CampaignAlreadyExists.propTypes = {
  exactMatchAddress: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired
};

export default CampaignAlreadyExists;
