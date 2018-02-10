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

  noMatchAddress = {
    address: 'none',
    name: "None of these match my address. Let's start a new campaign."
  };

  buildNearbyCampaignList(nearbyCampaigns, selectedOption, includeNoMatch = false) {
    const campaignsArr = [...nearbyCampaigns];
    if (includeNoMatch) {
      campaignsArr.push(this.noMatchAddress);
    }

    const nearbyCampaignListItems = campaignsArr.map(c => {
      // if the noMatch item is selected, selectedOption is the string 'none' instead of an object
      let checked = selectedOption && selectedOption.address === c.address;
      if (typeof selectedOption === 'string') {
        checked = c.address === 'none';
      }
      const showAddress = c.address !== 'none';
      const checkedClass = checked ? 'fa-check' : 'fa-circle-thin';

      return (
        <li
          className="list-group-item row p-0 mx-0 my-2 rounded-0 bg-clear border-clear nearby-address-item"
          key={c.address}
        >
          <input
            type="radio"
            id={c.address}
            value={c.address}
            checked={checked}
            onChange={this.handleOptionChange}
          />
          <label className="col-12" htmlFor={c.address}>
            <div className="row">
              <i className={`col-1 fa ${checkedClass}`} />
              <div className="col-10 nearby-address-info">
                {c.name ? <div>{c.name}</div> : ''}
                {showAddress && c.address}
              </div>
            </div>
          </label>
        </li>
      );
    });

    return <ul className="list-group my-2 nearby-address-list">{nearbyCampaignListItems}</ul>;
  }

  chooseAndRenderProperCampaignView = ({
    nearbyCampaigns,
    selectedAddress,
    searchedAddress,
    error
  } = {}) => {
    if (nearbyCampaigns && nearbyCampaigns.length !== 0) {
      if (nearbyCampaigns[0].address === searchedAddress.formatted_address) {
        return this.renderCampaignAlreadyExists(nearbyCampaigns, selectedAddress);
      }
      return this.renderNearbyCampaigns(nearbyCampaigns, selectedAddress);
    } else if (nearbyCampaigns && nearbyCampaigns.length === 0) {
      return this.renderNewCampaign();
    }
    return this.renderError(error);
  };

  renderCampaignAlreadyExists = (nearbyCampaigns, selectedAddress) => (
    <div>
      <form className="">
        {this.renderAddressHeading('Your address already has a campaign.', 'Is this your address?')}
        {this.buildNearbyCampaignList(nearbyCampaigns, selectedAddress)}
        {this.renderSubmitButton('JOIN CAMPAIGN')}
        <div className="row justify-content-center">
          <div className="col-11 padding-box">
            <AutoSuggestInput />
          </div>
        </div>
      </form>
    </div>
  );

  renderNearbyCampaigns = (nearbyCampaigns, selectedAddress) => (
    <div>
      <form className="">
        {this.renderAddressHeading('We found some campaigns nearby!')}
        {this.buildNearbyCampaignList(
          nearbyCampaigns,
          selectedAddress,
          /* includeNoMatch = */ true
        )}
        {this.renderSubmitButton('JOIN CAMPAIGN')}
      </form>
    </div>
  );

  renderNewCampaign = () => (
    <div>
      {this.renderAddressHeading(
        "You're the first to support recycling for your building!",
        "Launch your building's request for recycling! (We promise it will only take a minute)"
      )}
      {this.renderSubmitButton('CREATE CAMPAIGN')}
    </div>
  );
  renderAddressHeading = (headingTitle, subTitle) => (
    <div className="py-3 text-center">
      <h1 className="new-address-heading py-3">{headingTitle}</h1>
      {subTitle && <h2 className="new-address-sub-heading py-3">{subTitle}</h2>}
    </div>
  );
  renderSubmitButton = submitText => (
    <div className="row justify-content-center">
      <button
        className="col-10 btn p-3 rounded-0 join-campaign-button"
        type="submit"
        onClick={this.handleFormSubmit}
      >
        {submitText}
        <i className="fa fa-arrow-right" />
      </button>
    </div>
  );
  renderLoading = () => (
    <div className="loader">
      <h1 className="loading-header">Searching for nearby campaigns...</h1>
      <i className="fa fa-recycle fa-4x slow-spin loading-spinner" />
    </div>
  );
  renderError = error => {
    if (error.searchError) {
      return (
        <div>
          <p>{error.userMessage}</p>
        </div>
      );
    }
  };

  render() {
    const {
      loading,
      loaded,
      nearbyCampaigns,
      selectedAddress,
      searchedAddress,
      error
    } = this.props;
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5  p-0 text-white">
            {loading && this.renderLoading()}
            {!loading && error && this.renderError(error)}
            {loaded && this.chooseAndRenderProperCampaignView(this.props)}
          </div>
        </div>
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
