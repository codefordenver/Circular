import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader';

import { fetchApartmentMatchesRequest } from '../actions/apartments';

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

  handleSelect(address) {
    this.setState({ address });
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
        console.log('Success!', latLng);
        // this.props.fetchApartmentMatchesRequest(latLng)
        this.setState({ googleApiError: false });
      })
      .catch(error => this.setState({ googleApiError: error }));
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
    this.addressInput.focus();
  }

  render() {
    const cssClasses = {
      root: 'form_group',
      input: 'search_input',
      autocompleteContainer: 'autocomplete_container'
    };

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
        { this.state.googleApiError &&
        <p style={{ color: 'red' }}> Sorry, we're having trouble finding that address </p>}
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
      </div>
    );
  }
}

export default connect(
  ({ apartmentMatches }) => ({ apartmentMatches }), { fetchApartmentMatchesRequest })(scriptLoader(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`)(AutoSuggestInput));
