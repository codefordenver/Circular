import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import formatAddress from '../utils/formatAddress';

import { setCampaignInformation } from '../redux/actions/initialSearch';

class NewCampaign extends Component {
  constructor(props) {
    super(props);

    this.setAddressStep = this.setAddressStep.bind(this);
  }

  setAddressStep(e) {
    e.preventDefault();
    this.props.setCampaignInformation({
      street: e.target.street.value,
      city: e.target.city.value,
      state: e.target.state.value,
      zip: e.target.zip.value,
      aptNum: e.target.aptNum.value,
      campaignName: e.target.campaignName.value
    });
  }

  render() {
    const { initialSearch: { searchedAddress } } = this.props;
    let formattedAddress = {};
    if (searchedAddress) {
      formattedAddress = formatAddress(searchedAddress.address_components);
    }
    return (
      <div>
        <h1>New Campaign</h1>
        {formattedAddress.street &&
        <form onSubmit={this.setAddressStep}>
          <div>
            <label>Street</label>
            <input type="text" className="form-control" value={formattedAddress.street} name="street" />
          </div>
          <div>
            <label>City</label>
            <input type="text" className="form-control" value={formattedAddress.city} name="city" />
          </div>
          <div>
            <label>State</label>
            <input type="text" className="form-control" value={formattedAddress.state} name="state" />
          </div>
          <div>
            <label>Zip</label>
            <input type="number" className="form-control" value={formattedAddress.zip} name="zip" />
          </div>
          <div>
            <label>Apartment Number</label>
            <input type="number" className="form-control" value={formattedAddress.aptNum} name="aptNum" />
          </div>
          <br />
          <div>
            <label>Campaign Name</label>
            <input type="text" className="form-control" name="campaignName" />
          </div>
          <br />
          <button type="submit">Next</button>
        </form>}
        {!formattedAddress.street && <p>Add an address to start. <Link to="/">Click here</Link></p>}
      </div>
    );
  }
}

export default connect(
  ({ initialSearch }) => ({ initialSearch }),
  { setCampaignInformation })(NewCampaign);
