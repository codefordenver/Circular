import React, { Component } from 'react';
import './App.css';
import NavBar from './navbar';
import ApartmentMap from './apartmentmap';
import NodeGeocoder from 'node-geocoder';

class App extends Component {
  state = {
    markers: [{
      position: {
        lat: 39.7392, lng: -104.9903
      },
      key: `Denver`,
      defaultAnimation: 2,
    }],
  };

  geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_KEY}`,
  });

  componentDidMount(){
    fetch('/api/v1/apartments')
      .then(response => {
        if(response.ok) {
          response.json().then(apartmentRecords => {
            apartmentRecords.map(record => {
              // this.geocoder.geocode(record.street_address)
              this.geocoder.geocode(record.street_address, function(err, geoCodedAddress) {
                //.then(geoCodedAddress => {
                  this.setState(previous => {
                    previous.markers.push({
                      key: record.id,
                      position: {
                        lat: geoCodedAddress.latitude,
                        lng: geoCodedAddress.longitude,
                        defaultAnimation: 2
                      }
                    });
                    return {markers: previous};
                  })
                })
              })
            })
          }
        });
  }

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
