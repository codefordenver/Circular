import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader';

import {
  beginAddressSearch,
  searchGoogleForAddress,
  getLatLong,
  fetchNearbyCampaigns,
  searchAddressFlow,
  clearSearchResults
} from '../actions/apartments';

class AutoSuggestInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      isGoogleReady: false,
      googleApiError: false,
      isFieldActive: false
    };
    this.onChange = address => this.setState({ address, googleApiError: false });
  }

  async handleSelect(address) {
    const {
      beginAddressSearch,
      searchGoogleForAddress,
      getLatLong,
      fetchNearbyCampaigns,
      searchAddressFlow
    } = this.props;

    // asynch/await version:
    beginAddressSearch();
    const places = await searchGoogleForAddress(address, geocodeByAddress);
    if (places.error) { return; }
    const latLng = await getLatLong(places.response, getLatLng);
    if (latLng.error) { return; }
    fetchNearbyCampaigns(latLng.response);

    // Promise version:
    // beginAddressSearch();
    // searchGoogleForAddress(address, geocodeByAddress)
    //   .then((place) => {
    //     if (!place.response) { throw new Error(place.error); }
    //     return getLatLong(place.response, getLatLng);
    //   })
    //   .then((latLng) => {
    //     if (!latLng.response) { throw new Error(latLng.error); }
    //     return fetchNearbyCampaigns(latLng.response);
    //   })
    //   .catch(err => console.error(err));

    // Broken version:
    // searchAddressFlow(address, geocodeByAddress, getLatLng)
  }

  handleSearchClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.handleSelect(this.state.address);
    this.addressInput.focus();
  }

  clearInput(e) {
    e.preventDefault();
    this.setState({ address: '' });
    this.props.clearSearchResults();
    this.addressInput.focus();
  }

  renderNearbyCampaigns(nearbyCampaignsArr) {
    return nearbyCampaignsArr.map(c => <li><p>{ c.street_address }</p></li>);
  }

  render() {
    const cssClasses = {
      root: 'form_group',
      input: 'search_input',
      autocompleteContainer: 'autocomplete_container'
    };

    const renderNearby = this.renderNearbyCampaigns;

    const { error, nearbyCampaigns, loading, loaded } = this.props.initialSearch;

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="input_suggestion_item">
        <i className="fa fa-map-marker" />
        <strong className="suggestion_text_bold">{formattedSuggestion.mainText}</strong>{' '}
        <small className="suggestion_text_muted">{formattedSuggestion.secondaryText}</small>
      </div>);

    const inputProps = {
      ref: input => this.addressInput = input,
      type: 'text',
      value: this.state.address,
      onChange: this.onChange,
      autoFocus: true,
      placeholder: 'Search your address'
    };

    return (
      <div className="autosuggest_input_form">
        <div className="input_form">
          { this.props.isScriptLoaded ?
            <PlacesAutocomplete
              autocompleteItem={AutocompleteItem}
              highlightFirstSuggestion
              classNames={cssClasses}
              inputProps={inputProps}
              onSelect={address => this.handleSelect(address)}
              onEnterKeyDown={address => this.handleSelect(address)}
              clearItemsOnError
            />
          : <input type="text" /> }
          { this.state.address &&
            <button
              className="clear_button"
              onClick={e => this.clearInput(e)}
            >
              <i className="fa fa-times fa-2x" aria-hidden="true" />
            </button>
	  			}
          <button
            className="search_button"
            disabled={!this.state.address}
            onClick={e => this.handleSearchClick(e)}
          >
            <i className="fa fa-search fa-2x" aria-hidden="true" />
          </button>
        </div>
        <div className="temporary-results-box">
          { loading && <p> Searching... </p> }
          { !loading && error && error.searchError && <p>{error.userMessage}</p> }
          { loaded && nearbyCampaigns &&
            <div>
              <p>{"Here's some nearby campaigns:"}</p>
              <ul>{renderNearby(nearbyCampaigns)}</ul>
            </div>
          }
          { !loading && error && error.dbResponse &&
            <p>{"We didn't find any campaigns near you. Would you like to start one?"}</p>
          }
        </div>
      </div>
    );
  }
}

export default connect(
  ({ initialSearch }) => ({ initialSearch }), { beginAddressSearch,
    searchGoogleForAddress,
    getLatLong,
    fetchNearbyCampaigns,
    searchAddressFlow,
    clearSearchResults
  })(scriptLoader(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`)(AutoSuggestInput));
