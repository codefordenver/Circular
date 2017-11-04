import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

const CreateCampaignStep1 = props => {
	const { initialSearch: { searchedAddress, error } } = props;
	let formattedAddress = {};
	if (searchedAddress) {
		formattedAddress = searchedAddress.formatted_address;
	}

	return (
		<div className="add_address_wrapper">
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
					<Link
						className="btn btn-primary fr"
						type="submit"
						to="/new-campaign/optional-info"
					>
						Next
					</Link>
					<div className="cf" />
				</form>
			)}
			{error && (
				<div>
					<p>
						There was an issue with the address you provided. It may be
						associated with a preexisting campaign.
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
	);
};

export default connect(({ initialSearch }) => ({ initialSearch }))(
	CreateCampaignStep1
);
