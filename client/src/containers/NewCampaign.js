import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cx from 'classnames';


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
		const {childRoutes} = this.props.route;
		const { pathname } = this.props.location;
    let formattedAddress = {};
    if (searchedAddress) {
      formattedAddress = searchedAddress.formatted_address;
    }
    return (
      <div className="create_campaign_wrapper">
				<h1>Let's create a campaign!</h1>
				<div className="create_campaign_breadcrumbs">
					{childRoutes.map(childRoute => <Link to={`/new-campaign/${childRoute.path}`}><div className={cx("breadcrumb", pathname === `/new-campaign/${childRoute.path}` && "active_route")} /></Link>)}
				</div>	
				<section className="create_campaign_subroute_wrapper">
					{this.props.children}
				</section>	
      </div>
    );
  }
}

export default connect(({ initialSearch }) => ({ initialSearch }), { createCampaign })(NewCampaign);
