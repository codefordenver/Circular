import React, { Component } from 'react';
import ApartmentMap from '../components/ApartmentMap/apartmentmap';
import NavBar from '../components/Navbar/navbar';
import NodeGeocoder from 'geocoder';
import HeroCTA from '../components/HeroCTA';

class App extends Component {
  state = {
    markers: [],
    isOpen: false
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

  openMap() {
    this.setState({isOpen: true});
  }

  closeMap(){
    this.setState({isOpen: false});
  }
  
  render() {
    return (
      <div className="container">
        <NavBar />
        <HeroCTA
        openMap={() => this.openMap()}
        />
        <ApartmentMap
          isOpen={this.state.isOpen}
          markers={this.state.markers}
          closeMap={() => this.closeMap()}
        />
      </div>
    );
  }
}

export default App;
