import React, { Component } from 'react';
import './App.scss';
import ApartmentMap from '../components/ApartmentMap/apartmentmap';
import NavBar from '../components/Navbar/navbar';
import NodeGeocoder from 'geocoder';

class App extends Component {
  state = {
    markers: [],
  };

  componentDidMount(){
    fetch('/api/v1/apartments')
      .then(response => {
        if(response.ok) {
          response.json().then(apartmentRecords => {
            apartmentRecords.map(record => {
              NodeGeocoder.geocode(record.street_address, (err, geoCodedAddress) => {
                const location = geoCodedAddress.results[0].geometry.location
                  this.setState(previous => {
                    previous.markers.push({
                      key: record.id,
                      position: {
                        lat: location.lat,
                        lng: location.lng
                      },
                      defaultAnimation: 2
                    });
                    return {markers: previous.markers};
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
