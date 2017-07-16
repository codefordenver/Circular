import React, { Component } from 'react';
import AutoSuggestInput from './AutoSuggestInput';


class SearchAddress extends Component {
  render() {
    return (
      <div className="searchAddress">
        <h1 className="searchAddress-heading">Does your apartment building need recycling? Build Support!</h1>
        <AutoSuggestInput className="searchAddress-input" />
        <a className="searchAddress-link" href="/">Learn more first</a>
      </div>
    );
  }
}

export default SearchAddress;
