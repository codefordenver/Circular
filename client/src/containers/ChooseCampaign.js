import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  renderNearbyCampaigns(nearbyCampaignsArr, selectedOption) {
    return nearbyCampaignsArr.map(c => (
      <li className="chooseCampaign-item" key={c.address}>
        <input
          type="radio"
          id={c.address}
          value={c.address}
          checked={selectedOption && selectedOption.address === c.address}
          onChange={this.handleOptionChange}
        />
        <label htmlFor={c.address}>
          {c.name ? <div>{c.name}</div> : ''}
          {c.address}
        </label>
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
      <div className="container">
        {loading && (
          <div className="loader">
            <h1 className="loading-header">Searching for nearby campaigns...</h1>
            <i className="fa fa-recycle fa-4x slow-spin loading-spinner" />
          </div>
        )}
        {!loading && (
          <div className="search_address_wrapper">
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
                      <h2 className="search_address_sub_heading">Is this your address?</h2>
                      <ul className="chooseCampaign-list">
                        {this.renderNearbyCampaigns(nearbyCampaigns, selectedAddress)}
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
                        {this.renderNearbyCampaigns(nearbyCampaigns, selectedAddress)}
                        <li className="chooseCampaign-item" key="no-match">
                          <input
                            id="none"
                            type="radio"
                            value="none"
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
        )}
      </div>
    );
  }
}

ChooseCampaign.defaultProps = {
  error: null
};

ChooseCampaign.propTypes = {
  selectAddress: PropTypes.func.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
  nearbyCampaigns: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  searchedAddress: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedAddress: PropTypes.string.isRequired,
  fetchCampaignById: PropTypes.func.isRequired,
  router: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(({ initialSearch }) => ({ ...initialSearch }), {
  selectAddress,
  fetchCampaignById
})(withRouter(ChooseCampaign));
