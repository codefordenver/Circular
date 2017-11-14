/* eslint-disable react/prop-types, no-shadow */ /* - TODO: Fix and remove this line */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { updateNewCampaign } from '../redux/actions/newCampaign';

const CreateCampaignStep2 = props => {
  const { updateNewCampaign, router } = props;

  const setOptionalInfo = async e => {
    e.preventDefault();

    await updateNewCampaign({
      propertyManager: {
        name: e.target.name.value,
        address: e.target.address.value,
        phone: e.target.phone.value,
        email: e.target.email.value
      },
      wasteProvider: {
        name: e.target.wasteMgmtName.value,
        phone: e.target.wasteMgmtPhone.value,
        email: e.target.wasteMgmtEmail.value
      },
      unitCount: e.target.unitCount.value
    });

    router.push('/new-campaign/activate');
  };

  return (
    <form onSubmit={setOptionalInfo}>
      <div className="form-group">
        <label>Property Manager or Company (Optional):</label>
        <input type="text" className="form-control" placeholder="Name" name="name" />
        <input type="text" className="form-control" placeholder="Address" name="address" />
        <input type="tel" placeholder="Phone" className="form-control" name="phone" />
        <input type="email" className="form-control" placeholder="Email" name="email" />
      </div>
      <div className="form-group">
        <label>Waste Collection Provider (Optional):</label>
        <input type="text" className="form-control" placeholder="Name" name="wasteMgmtName" />
        <input type="tel" placeholder="Phone" className="form-control" name="wasteMgmtPhone" />
        <input type="email" className="form-control" placeholder="Email" name="wasteMgmtEmail" />
      </div>
      <div className="form-group">
        <label>Number of Units (Optional)</label>
        <input type="number" className="form-control" name="unitCount" />
      </div>
      <button className="btn btn-primary fr" type="submit">
        {'Next ➡'}
      </button>
      <Link to="/new-campaign/address" className="btn btn-primary fr">
        {'⬅ Back'}
      </Link>
      <div className="cf" />
    </form>
  );
};

export default connect(({ initialSearch }) => ({ initialSearch }), {
  updateNewCampaign
})(CreateCampaignStep2);
