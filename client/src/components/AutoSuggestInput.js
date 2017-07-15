import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader';

class AutoSuggestInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      isGoogleReady: false
    };
    this.onChange = address => this.setState({ address });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };

    return (
      <form onSubmit={(e) => { this.handleFormSubmit(e); }}>
        { this.props.isScriptLoaded ? <PlacesAutocomplete inputProps={inputProps} /> : <input type="text" /> }
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default scriptLoader(
  `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`
)(AutoSuggestInput);
