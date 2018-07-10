import React from 'react';
import PropTypes from 'prop-types';
import SubmitButton from './SubmitButton';
import RenderAddressHeading from './RenderAddressHeading';

const RenderNewCampaign = ({ handleSubmit }) => (
  <div>
    <RenderAddressHeading
      headingTitle={"You're the first to support recycling for your building!"}
      subTitle={
        "Launch your building's request for recycling! (We promise it will only take a minute)"
      }
    />
    <SubmitButton buttonText={'CREATE CAMPAIGN'} handleFormSubmit={handleSubmit} />
  </div>
);

RenderNewCampaign.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default RenderNewCampaign;
