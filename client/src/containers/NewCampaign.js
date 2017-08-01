import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import formatAddress from '../utils/formatAddress';

class NewCampaign extends Component {
  constructor(props) {
    super(props);

    this.setAddressStep = this.setAddressStep.bind(this);
  }

  setAddressStep() {

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
        <form action="">
          <div>
            <label>Street</label>
            <input type="text" className="form-control" value={formattedAddress.street} />
          </div>
          <div>
            <label>City</label>
            <input type="text" className="form-control" value={formattedAddress.city} />
          </div>
          <div>
            <label>State</label>
            <input type="text" className="form-control" value={formattedAddress.state} />
          </div>
          <div>
            <label>Zip</label>
            <input type="number" className="form-control" value={formattedAddress.zip} />
          </div>
          <div>
            <label>Apartment Number</label>
            <input type="number" className="form-control" value={formattedAddress.aptNum} />
          </div>
        </form>}
        {!formattedAddress.street && <p>Add an address to start. <Link to="/">Click here</Link></p>}
      </div>
    );
  }
}

export default connect(({ initialSearch }) => ({ initialSearch }))(NewCampaign);
