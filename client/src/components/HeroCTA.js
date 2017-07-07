import React, { Component } from 'react';

class HeroCTA extends Component {
  state = {

  };

  componentDidMount(){

  }

  render() {
    return (
      <div className="hero_wrapper">
        <button className="open_map_button" onClick={this.props.openMap}>Explore The Map</button>
      </div>
    );
  }
}

export default HeroCTA;
