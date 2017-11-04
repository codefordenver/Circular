import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ModalWrapper from '../components/ModalWrapper';

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
    const { initialSearch: { searchedAddress, error } } = this.props;
    let formattedAddress = {};
    if (searchedAddress) {
      formattedAddress = searchedAddress.formatted_address;
    }
    return (
      <ModalWrapper title="New Campaign">
        {!error && <h1>Create a new campaign using the form below.</h1>}
        <br />
        {formattedAddress && (
          <form onSubmit={this.setAddressStep}>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                value={formattedAddress}
                name="address"
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Apartment Number</label>
              <input type="text" className="form-control" name="aptNum" />
            </div>
            <div className="form-group">
              <label>Campaign Name</label>
              <input type="text" className="form-control" name="campaignName" />
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
      </ModalWrapper>
    );
  }
}

export default connect(({ initialSearch }) => ({ initialSearch }), { createCampaign })(NewCampaign);
