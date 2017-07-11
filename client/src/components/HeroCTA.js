import React, { Component } from 'react';

import SearchAddress from './SearchAddress';

class HeroCTA extends Component {
  state = {

  };

  componentDidMount(){

  }

  render() {
    return (
      <div className="hero_wrapper">
        <button className="open_map_button" onClick={this.props.openMap}>Explore The Map</button>
        <SearchAddress />
      </div>
    );
  }
}

export default HeroCTA;
