import React from "react";
import PropTypes from "prop-types";
import RenderAddressHeading from "./RenderAddressHeading";
import SubmitButton from "./SubmitButton";

const RenderCampaignAlreadyExists = ({ exactMatchAddress, handleSelection }) => (
  <div>
    <RenderAddressHeading
      headingTitle={"Looks like this address already has a campaign. Is this your address?"}
      subTitle={exactMatchAddress}
    />
    <SubmitButton
      handleSelection={handleSelection}
      buttonText={"Yup! Show Me!"}
      name={"EXISTING_CAMPAIGN"}
    />
    <div style={{ marginTop: "1em" }} />
    <SubmitButton
      handleSelection={handleSelection}
      buttonText={"Nope, Take Me Back"}
      name={"GO BACK"}
      faArrowDirection={"left"}
    />
  </div>
);

RenderCampaignAlreadyExists.propTypes = {
  exactMatchAddress: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired
};

export default RenderCampaignAlreadyExists;
