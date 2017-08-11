import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { selectAddress } from '../redux/actions/initialSearch';
import fetchCampaignById from '../redux/actions/activeCampaign';

class ChooseCampaign extends Component {
  constructor(props) {
    super(props);
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
    if (!selectedAddress || selectedAddress === 'none') {
      this.props.router.push('/new-campaign/address');
    } else {
      this.props.fetchCampaignById(selectedAddress.id);
      this.props.router.push(`/campaign/${selectedAddress.id}`);
    }
  }

  renderNearbyCampaigns(nearbyCampaignsArr, selectedOption, handleOptionChange) {
    return (
      nearbyCampaignsArr.map(c => (
        <div className="radio" key={c.street_address}>
          <label>
            <input
              type="radio"
              value={c.street_address}
              checked={selectedOption && selectedOption.street_address === c.street_address}
              onChange={handleOptionChange}
            />
            { c.street_address }
          </label>
        </div>)
      )
    );
  }

  render() {
    const { error, nearbyCampaigns, loading, loaded, selectedAddress } = this.props;

    return (
      <div className="hero_wrapper">
        <div className="container">
          <div className="search_address_wrapper">
          {/*<form className="search_address_wrapper">
            <h1 className="search_address_heading">Need recycling at your building?</h1>
            <h2 className="search_address_sub_heading"> Join or create a campaign!</h2>
            <AutoSuggestInput />
            <Link className="search_address_link" to="/denver-recycling-info">Learn more first</Link>
          </form>*/}
          { loading && <i className="fa fa-recycle fa-4x fa-spin" /> }
          { !loading && error && error.searchError && <p>{error.userMessage}</p> }
          { loaded && nearbyCampaigns && Array.isArray(nearbyCampaigns) &&
          <form className="">
            <h1 className="search_address_heading">{'We found these campaigns near you.'}</h1>
            <h2 className="search_address_sub_heading">{'Do any of these campaigns represent where you live?'}</h2>
            {this.renderNearbyCampaigns(nearbyCampaigns, selectedAddress, this.handleOptionChange)}
            <div className="radio" key="no-match">
              <label>
                <input
                  type="radio"
                  value={'none'}
                  checked={selectedAddress === 'none'}
                  onChange={this.handleOptionChange}
                />
                { "None of these match my address. Let's start a new campaign." }
              </label>
            </div>
          </form>
          }
          { !loading && nearbyCampaigns && nearbyCampaigns.status === 'okay' && !nearbyCampaigns.results &&
          <div>
            <h1 className="search_address_heading">{"You're the first to support recycling for your building!"}</h1>
            <h2 className="search_address_sub_heading">{"Launch your building's request for recycling!"}</h2>
            <h2 className="search_address_sub_heading">{"(We promise it will only take a minute)"}</h2>
          </div>
          }
          <button className="btn" type="submit" onClick={this.handleFormSubmit}>OK - LET'S DO THIS!</button>
        </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ initialSearch }) => ({ ...initialSearch }), { selectAddress, fetchCampaignById })(withRouter(ChooseCampaign));
