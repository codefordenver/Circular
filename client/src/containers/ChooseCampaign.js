import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { selectAddress } from '../redux/actions/initialSearch';
import fetchCampaignById from '../redux/actions/activeCampaign';
import AutoSuggestInput from '../components/AutoSuggestInput';

class ChooseCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleOptionChange(e) {
    this.props.selectAddress(e.target.value);
  }

  handleFormSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    const selectedOption = this.state.selectedOption;
    const { selectedAddress } = this.props;
    if (selectedAddress === 'different') {
      this.props.router.push('/');
    } else if (!selectedAddress || selectedAddress === 'none') {
      this.props.router.push('/new-campaign/address');
    } else {
      this.props.fetchCampaignById(selectedAddress.id);
      this.props.router.push(`/campaign/${selectedAddress.id}`);
    }
  }

  renderNearbyCampaigns(nearbyCampaignsArr, selectedOption, handleOptionChange) {
    return nearbyCampaignsArr.map(c => (
      <li className="chooseCampaign-item" key={c.address}>
        <input
          type="radio"
          id={c.address}
          value={c.address}
          checked={selectedOption && selectedOption.address === c.address}
          onChange={handleOptionChange}
        />
        <label htmlFor={c.address}>{c.address}</label>
      </li>
    ));
  }

  render() {
    const {
      error,
      nearbyCampaigns,
      loading,
      loaded,
      selectedAddress,
      searchedAddress
    } = this.props;

    return (
      <div className="hero_wrapper">
        <div className="container">
          <div className="search_address_wrapper">
            {/* <form className="search_address_wrapper">
            <h1 className="search_address_heading">Need recycling at your building?</h1>
            <h2 className="search_address_sub_heading"> Join or create a campaign!</h2>
            <AutoSuggestInput />
            <Link className="search_address_link" to="/denver-recycling-info">Learn more first</Link>
          </form> */}
            {loading && <i className="fa fa-recycle fa-4x fa-spin" />}
            {!loading && error && error.searchError && <p>{error.userMessage}</p>}
            {loaded &&
              nearbyCampaigns &&
              nearbyCampaigns.length !== 0 && (
                <div>
                  {nearbyCampaigns[0].address === searchedAddress.formatted_address && (
                    <form className="">
                      <h1 className="search_address_heading">
                        {'Your address already has a campaign!.'}
                      </h1>
                      <h2 className="search_address_sub_heading">{'Is this your address?'}</h2>
                      <ul className="chooseCampaign-list">
                        {this.renderNearbyCampaigns(
                          nearbyCampaigns,
                          selectedAddress,
                          this.handleOptionChange
                        )}
                        <div className="btn-wrapper">
                          <button className="btn" type="submit" onClick={this.handleFormSubmit}>
                            {"YES - LET'S DO THIS!"}
                          </button>
                        </div>
                        <AutoSuggestInput />
                      </ul>
                    </form>
                  )}
                  {nearbyCampaigns[0].address !== searchedAddress.formatted_address && (
                    <form className="">
                      <h1 className="search_address_heading">
                        {'We found these campaigns near you.'}
                      </h1>
                      <h2 className="search_address_sub_heading">
                        {'Do any of these campaigns represent where you live?'}
                      </h2>
                      <ul className="chooseCampaign-list">
                        {this.renderNearbyCampaigns(
                          nearbyCampaigns,
                          selectedAddress,
                          this.handleOptionChange
                        )}
                        <li className="chooseCampaign-item" key="no-match">
                          <input
                            id="none"
                            type="radio"
                            value={'none'}
                            checked={selectedAddress === 'none'}
                            onChange={this.handleOptionChange}
                          />
                          <label htmlFor="none">
                            {"None of these match my address. Let's start a new campaign."}
                          </label>
                        </li>
                      </ul>
                      <div className="btn-wrapper">
                        <button className="btn" type="submit" onClick={this.handleFormSubmit}>
                          {"OK - LET'S DO THIS!"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            {!loading &&
              nearbyCampaigns &&
              nearbyCampaigns.length === 0 && (
                <div>
                  <h1 className="search_address_heading">
                    {"You're the first to support recycling for your building!"}
                  </h1>
                  <h2 className="search_address_sub_heading">
                    {"Launch your building's request for recycling!"}
                  </h2>
                  <h2 className="search_address_sub_heading">
                    {'(We promise it will only take a minute)'}
                  </h2>
                  <div className="btn-wrapper">
                    <button className="btn" type="submit" onClick={this.handleFormSubmit}>
                      {"OK - LET'S DO THIS!"}
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ initialSearch }) => ({ ...initialSearch }), {
  selectAddress,
  fetchCampaignById
})(withRouter(ChooseCampaign));
