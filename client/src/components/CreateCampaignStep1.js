/* eslint-disable react/prop-types, no-shadow *//* - TODO: Fix and remove this line */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { updateNewCampaign } from '../redux/actions/newCampaign';

const CreateCampaignStep1 = (props) => {
  const {
    initialSearch: { searchedAddress, error },
    updateNewCampaign,
    router
  } = props;

  const formattedAddress = searchedAddress && searchedAddress.formatted_address;

  const setAddressAndName = async (e) => {
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
    <div className="add_address_wrapper">
      {formattedAddress && (
        <form onSubmit={setAddressAndName}>
          <div className="form-group">
            <label className="required">Address</label>
            <input
              type="text"
              className="form-control"
              value={formattedAddress}
              name="address"
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="required">Campaign Name</label>
            <div className="requiredtool" />
            <input type="text" className="form-control" name="campaignName" required />
          </div>
          <br />
          <button className="btn btn-primary fr" type="submit">
            {'Next ➡'}
          </button>
          <div className="cf" />
        </form>
      )}
      {error && (
        <div>
          <p>
            {
              'There was an issue with the address you provided. It may be associated with a preexisting campaign.'
            }
          </p>
          <br />
        </div>
      )}
      {!formattedAddress && (
        <p>
          {'Add an address to start.'} <Link to="/">{'Click here'}</Link>
        </p>
      )}
    </div>
  );
};

export default connect(({ initialSearch }) => ({ initialSearch }), {
  updateNewCampaign
})(CreateCampaignStep1);
