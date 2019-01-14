import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader';
import { GeoPoint } from '../firebase';
import { clearSearchResults } from '../redux/actions/initialSearch';

class AutoSuggestInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      error: ''
    };
    this.onChange = address => this.setState({ address, error: '' });
  }

  handleSelect = address => {
    // IF USER HAS ALREADY SIGNED A CAMPAIGN, SKIP SELECTION PROCESS
    // TODO HANDLE USER SEARCH FLOW FOR ALREADY SIGNED USERS
    const userHasSignedCampaign = this.props.auth.signedCampaignId;
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        // CONVERT GEOCOORDINATES IN FIRESTORE GEOPOINT
        const searchedGeoPoint = new GeoPoint(lat, lng);
        this.props.firebaseSearchAddressFlow(address, searchedGeoPoint, userHasSignedCampaign);
      })
      .catch(error => this.setState({ error }));
  };

  handleSearchClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.handleSelect(this.state.address);
    this.addressInput.focus();
  }

  clearInput(e) {
    e.preventDefault();
    this.setState({ address: '', error: '' });
    this.props.clearSearchResults();
    this.addressInput.focus();
  }

  render() {
    const cssClasses = {
      root: 'form_group',
      input: 'search_input',
      autocompleteContainer: 'autocomplete_container',
      autocompleteItemActive: 'input_suggestion_item_active'
    };

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="input_suggestion_item">
        <i className="fa fa-map-marker" />
        <strong className="suggestion_text_bold">{formattedSuggestion.mainText}</strong>{' '}
        <small className="suggestion_text_muted">{formattedSuggestion.secondaryText}</small>
      </div>
    );

    const inputProps = {
      ref: input => {
        this.addressInput = input;
      },
      type: 'text',
      value: this.state.address,
      onChange: this.onChange,
      autoFocus: false,
      placeholder: 'Search your address'
    };

    return (
      <div className="autosuggest_input_form">
        <div className={`error-box ${this.state.error ? 'open' : 'closed'}`}>
          <p className="error-text">{"Sorry, we couldn't find that address."}</p>
        </div>
        <div className="input_form">
          {this.props.isScriptLoaded ? (
            <PlacesAutocomplete
              autocompleteItem={AutocompleteItem}
              classNames={cssClasses}
              inputProps={inputProps}
              onSelect={address => this.handleSelect(address)}
              onEnterKeyDown={address => this.handleSelect(address)}
              clearItemsOnError
            />
          ) : (
            <input type="text" />
          )}
          {this.state.address && (
            <button className="clear_button" onClick={e => this.clearInput(e)}>
              <i className="fa fa-times fa-2x" aria-hidden="true" />
            </button>
          )}
          <button
            className="search_button"
            disabled={!this.state.address || this.state.error}
            onClick={e => this.handleSearchClick(e)}
          >
            <i className="fa fa-search fa-2x" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}

AutoSuggestInput.defaultProps = {
  auth: PropTypes.shape({
    signedCampaignId: null
  })
};

AutoSuggestInput.propTypes = {
  firebaseSearchAddressFlow: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    signedCampaignId: PropTypes.string
  }).isRequired,
  clearSearchResults: PropTypes.func.isRequired,
  isScriptLoaded: PropTypes.bool.isRequired
};

export default connect(
  ({ auth }) => ({ auth }),
  {
    clearSearchResults
  }
)(
  scriptLoader(
    `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_GOOGLE_MAPS_KEY
    }&libraries=places`
  )(AutoSuggestInput)
);
