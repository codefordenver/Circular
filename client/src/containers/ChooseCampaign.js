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

  buildNearbyCampaignList(nearbyCampaignsArr, selectedOption, includeNoMatch = false) {
    const liClassNames =
      'list-group-item row p-0 mx-0 my-2 rounded-0 bg-clear border-clear nearby-address-item';
    const nearbyCampaignListItems = nearbyCampaignsArr.map(c => {
      const checked = selectedOption && selectedOption.address === c.address;
      return (
        <li className={liClassNames} key={c.address}>
          <i className={`col-1 fa ${checked ? 'fa-check' : 'fa-circle-thin'}`} />
          <input
            className=""
            type="radio"
            id={c.address}
            value={c.address}
            checked={checked}
            onChange={this.handleOptionChange}
          />
          <label className="col-11" htmlFor={c.address}>
            {c.name ? <div>{c.name}</div> : ''}
            {c.address}
          </label>
        </li>
      );
    });

    if (includeNoMatch) {
      const checked = selectedOption === 'none';
      nearbyCampaignListItems.push(
        <li className={liClassNames} key="no-match">
          <i className={`col-1 fa ${checked ? 'fa-check' : 'fa-circle-thin'}`} />
          <input
            className=""
            id="none"
            type="radio"
            value="none"
            checked={checked}
            onChange={this.handleOptionChange}
          />
          <label className="col-11" htmlFor="none">
            {"None of these match my address. Let's start a new campaign."}
          </label>
        </li>
      );
    }

    return <ul className="list-group my-2 nearby-address-list">{nearbyCampaignListItems}</ul>;
  }

  chooseAndRenderProperCampaignView = ({
    loading,
    loaded,
    nearbyCampaigns,
    selectedAddress,
    searchedAddress
  } = {}) => {
    if (loaded && nearbyCampaigns && nearbyCampaigns.length !== 0) {
      if (nearbyCampaigns[0].address === searchedAddress.formatted_address) {
        return this.renderCampaignAlreadyExists(nearbyCampaigns, selectedAddress);
      }
      return this.renderNearbyCampaigns(nearbyCampaigns, selectedAddress);
    } else if (!loading && nearbyCampaigns && nearbyCampaigns.length === 0) {
      return this.renderNewCampaign();
    }
  };

  renderCampaignAlreadyExists = (nearbyCampaigns, selectedAddress) => (
    <div>
      <form className="">
        {this.renderAddressHeading(
          'Your address already has a campaign!.',
          'Is this your address?'
        )}
        {this.buildNearbyCampaignList(nearbyCampaigns, selectedAddress)}
        {this.renderSubmitButton()}
        <AutoSuggestInput />
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
        {this.renderSubmitButton()}
      </form>
    </div>
  );

  renderNewCampaign = () => (
    <div>
      {this.renderAddressHeading(
        "You're the first to support recycling for your building!",
        "Launch your building's request for recycling!",
        '(We promise it will only take a minute)'
      )}
      {this.renderSubmitButton()}
    </div>
  );
  renderAddressHeading = (headingTitle, subTitle) => (
    <div className="py-3">
      <h1 className="search_address_heading">{headingTitle}</h1>
      {subTitle && <h2 className="search_address_sub_heading">{subTitle}</h2>}
    </div>
  );
  renderSubmitButton = () => (
    <div className="row">
      <button
        className="col-10 offset-1 btn p-3 rounded-0"
        type="submit"
        onClick={this.handleFormSubmit}
      >
        {"OK - LET'S DO THIS!"}
      </button>
    </div>
  );

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
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-5  p-0">
            {loading && (
              <div className="loader">
                <h1 className="loading-header">Searching for nearby campaigns...</h1>
                <i className="fa fa-recycle fa-4x slow-spin loading-spinner" />
              </div>
            )}
            {!loading && (
              <div className="">
                {!loading && error && error.searchError && <p>{error.userMessage}</p>}
                {this.chooseAndRenderProperCampaignView(this.props)}
              </div>
            )}
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
