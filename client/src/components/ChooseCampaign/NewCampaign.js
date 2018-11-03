import React from 'react';
import PropTypes from 'prop-types';
import SubmitButton from './SubmitButton';
import AddressHeading from './AddressHeading';

const NewCampaign = ({ handleSelection }) => (
  <div>
    <AddressHeading
      headingTitle={"You're the first to support recycling for your building!"}
      subTitle={
        "Launch your building's request for recycling! (We promise it will only take a minute)"
      }
    />
    <SubmitButton
      buttonText={'CREATE CAMPAIGN'}
      handleSelection={handleSelection}
      name={'NEW_CAMPAIGN'}
    />
  </div>
);

NewCampaign.propTypes = {
  handleSelection: PropTypes.func.isRequired
};

export default NewCampaign;
