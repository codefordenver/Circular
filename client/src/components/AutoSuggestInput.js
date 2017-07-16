import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader';

class AutoSuggestInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      isGoogleReady: false,
      googleApiError: false
    };
    this.onChange = address => this.setState({ address, googleApiError: false });
  }

  handleSelect(address) {
    this.setState({ address });
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
        console.log('Success', latLng);
        this.setState({ googleApiError: false });
      })
      .catch(error => this.setState({ googleApiError: error }));
  }

  render() {
    const cssClasses = {
      root: 'form-group',
      input: 'search_input',
      autocompleteContainer: 'autocomplete_container'
    };
    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="input_suggestion_item">
        <i className="fa fa-map-marker" />
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text_muted">{formattedSuggestion.secondaryText}</small>
      </div>);

    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.onChange,
      autoFocus: true,
      placeholder: 'Search your address'
    };

    return (
      <form className="autosuggest_input_form">
        { this.state.googleApiError &&
        <p style={{ color: 'red' }}> Sorry, we're having trouble finding that address </p>}
        { this.props.isScriptLoaded ?
          <PlacesAutocomplete
            autocompleteItem={AutocompleteItem}
            classNames={cssClasses}
            inputProps={inputProps}
            onSelect={address => this.handleSelect(address)}
            onEnterKeyDown={address => this.handleSelect(address)}
            clearItemsOnError
          />
          : <input type="text" /> }
      </form>
    );
  }
}

export default scriptLoader(
  `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`
)(AutoSuggestInput);
