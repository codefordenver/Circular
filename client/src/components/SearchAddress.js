import React, { Component } from 'react';
import AutoSuggestInput from './AutoSuggestInput';


class SearchAddress extends Component {
  render() {
    return (
      <div className="searchAddress">
        <h1 className="searchAddress-heading">Need recycling at your building?</h1>
        <h2 className="searchAddress_sub_heading"> Join or create a campaign!</h2>
        <AutoSuggestInput className="searchAddress-input" />
        <a className="searchAddress-link" href="/">Learn more first</a>
      </div>
    );
  }
}

export default SearchAddress;
