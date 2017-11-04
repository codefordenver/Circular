import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createCampaign } from '../redux/actions/initialSearch';

class NewCampaign extends Component {
  constructor(props) {
    super(props);

    this.setAddressStep = this.setAddressStep.bind(this);
  }

  setAddressStep(e) {
    e.preventDefault();
    this.props.createCampaign({
      address: this.props.initialSearch.searchedAddress.formatted_address,
      name: e.target.campaignName.value,
      lat: this.props.initialSearch.searchedAddress.latLng.response.lat,
      lng: this.props.initialSearch.searchedAddress.latLng.response.lng
    });
  }

  render() {
    const {initialSearch: {searchedAddress, error}} = this.props;
    let formattedAddress = {};
    if (searchedAddress) {
      formattedAddress = searchedAddress.formatted_address;
    }
    return (
      <div className="hero_wrapper">
        <div className="container">
          <div className="search_address_wrapper">
        {!error && <h1className="search_address_heading">Create a new campaign using the form below.</h1>}

        {formattedAddress && (
          <form onSubmit={this.setAddressStep}>
            <div className="form-group">
              <labelhtmlFor="formAddress">Address</label>
              <inputid="formAddress"
                type="text"
                className="form-control"
                value={formattedAddress}
                name="address"
                readOnly
              />
            </div>
            <div className="form-group">
              <labelhtmlFor="aptNum"> Numberof Apartments</label>
              <input type="text" className="form-control" name="aptNum" id="aptNum"/>
            </div>
            <div className="form-group">
              <labelhtmlFor="campaignName">Campaign Name</label>
              <input type="text" className="form-control" name="campaignName" id="campaignName"/>
            </div>
            <br />
            <button className="btn btn-primary fr" type="submit">
              Next
            </button>
            <div className="cf" />
          </form>
        )}
        {error && (
          <div>
            <p>
              There was an issue with the address you provided. It may be associated with a
              preexisting campaign.
            </p>
            <br />
          </div>
        )}
        {!formattedAddress && (
          <p>
            Add an address to start. <Link to="/">Click here</Link>
          </p>
        )}
      </div>
        </div>
      </div>
    );
  }
}

NewCampaign.defaultProps = {};

NewCampaign.propTypes = {
  createCampaign: PropTypes.func.isRequired,
  initialSearch: PropTypes.shape({
    apartments: PropTypes.array.isRequired,
    searchedAddress: PropTypes.objectOf(PropTypes.any)
  }).isRequired
};

export default connect(({initialSearch}) => ({initialSearch}), {createCampaign})(NewCampaign);
