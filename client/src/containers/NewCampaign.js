import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import formatAddress from '../utils/formatAddress';

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
      street: e.target.street.value,
      city: e.target.city.value,
      state: e.target.state.value,
      zip: e.target.zip.value,
      aptNum: e.target.aptNum.value,
      campaignName: e.target.campaignName.value,
      lat: e.target.lat.value,
      lng: e.target.lng.value
    });
  }

  render() {
    const { initialSearch: { searchedAddress } } = this.props;
    let formattedAddress = {};
    if (searchedAddress) {
      formattedAddress = formatAddress(searchedAddress.address_components);
    }
    return (
      <ModalWrapper title="New Campaign">
        <h1>Create a new campaign using the form below.</h1>
        <br />
        {formattedAddress.street &&
        <form onSubmit={this.setAddressStep}>
          <div className="form-group">
            <label>Street</label>
            <input type="text" className="form-control" value={formattedAddress.street} name="street" />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" className="form-control" value={formattedAddress.city} name="city" />
          </div>
          <div className="form-group">
            <label>State</label>
            <input type="text" className="form-control" value={formattedAddress.state} name="state" />
          </div>
          <div className="form-group">
            <label>Zip</label>
            <input type="number" className="form-control" value={formattedAddress.zip} name="zip" />
          </div>
          <div className="form-group">
            <label>Apartment Number</label>
            <input type="number" className="form-control" value={formattedAddress.aptNum} name="aptNum" />
          </div>
          <div className="form-group">
            <label>Campaign Name</label>
            <input type="text" className="form-control" name="campaignName" />
          </div>
          <input type="hidden" name="lat" value={searchedAddress.geometry.location.lat()} />
          <input type="hidden" name="lng" value={searchedAddress.geometry.location.lng()} />
          <br />
          <button className="btn btn-primary fr" type="submit">Next</button>
          <div className="cf" />
        </form>}
        {!formattedAddress.street && <p>Add an address to start. <Link to="/">Click here</Link></p>}
      </ModalWrapper>
    );
  }
}

export default connect(
  ({ initialSearch }) => ({ initialSearch }),
  { createCampaign })(NewCampaign);
