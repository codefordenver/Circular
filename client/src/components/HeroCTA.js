import React, { Component } from 'react';

import AutoSuggestInput from './AutoSuggestInput';


class HeroCTA extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="hero_wrapper">
        <button className="open_map_button" onClick={this.props.openMap}>Explore The Map</button>
        <form className="search_address_wrapper">
          <h1 className="search_address_heading">Need recycling at your building?</h1>
          <h2 className="search_address_sub_heading"> Join or create a campaign!</h2>
          <AutoSuggestInput />
          <a className="search_address_link" href="/">Learn more first</a>
        </form>
      </div>
    );
  }
}

export default HeroCTA;
