/* eslint-disable react/prop-types, no-shadow */ /* - TODO: Fix and remove this line */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { updateNewCampaign } from '../redux/actions/newCampaign';

const CreateCampaignStep1 = props => {
  const { initialSearch: { searchedAddress, error }, updateNewCampaign, router } = props;

  const formattedAddress = searchedAddress && searchedAddress.formatted_address;

  const setAddressAndName = async e => {
    e.preventDefault();
    await updateNewCampaign({
      address: searchedAddress.formatted_address,
      name: e.target.campaignName.value,
      lat: searchedAddress.latLng.response.lat,
      lng: searchedAddress.latLng.response.lng
    });
    router.push('/new-campaign/optional-info');
  };

  return (
    <Row>
      <Col xs={12}>
        {formattedAddress && (
          <form onSubmit={setAddressAndName}>
            <FormGroup controlId="addressAndName">
              <ControlLabel>Address</ControlLabel>
              <FormControl type="text" value={formattedAddress} name="address" readOnly />
            </FormGroup>
            <FormGroup>
              <ControlLabel className="create-campaign-control-label">Campaign Name</ControlLabel>
              <div className="requiredtool" />
              <FormControl type="text" name="campaignName" required />
            </FormGroup>
            <br />
            <Button bsStyle="remove-default" className="next-button fr" type="submit">
              Next
            </Button>
          </form>
        )}
        {error && (
          <div className="text-center">
            <p>
              {
                'There was an issue with the address you provided. It may be associated with a preexisting campaign.'
              }
            </p>
            <br />
          </div>
        )}
        {!formattedAddress && (
          <div className="text-center">
            <p>
              {'Add an address to start.'}{' '}
              <Link className="about-link" to="/">
                Click here
              </Link>
            </p>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default connect(({ initialSearch }) => ({ initialSearch }), {
  updateNewCampaign
})(CreateCampaignStep1);
