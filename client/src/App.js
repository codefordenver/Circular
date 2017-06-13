import React, { Component } from 'react';
import './App.css';
import NavBar from './navbar';
import ApartmentMap from './apartmentmap';

class App extends Component {
  componentDidMount(){
    // fetch('api/vi/apartments')
  }
  state = {
    markers: [{
      position: {
        lat: 39.7392, lng: -104.9903
      },
      key: `Taiwan`,
      defaultAnimation: 2,
    }],
  };
  render() {
    return (
      <div className="container">
        <NavBar />
        <ApartmentMap markers={this.state.markers} />
      </div>
    );
  }
}

export default App;
