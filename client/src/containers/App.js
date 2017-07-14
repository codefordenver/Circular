import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApartmentMap from '../components/ApartmentMap/apartmentmap';
import NavBar from '../components/Navbar/navbar';
import HeroCTA from '../components/HeroCTA';
import SearchAddress from '../components/SearchAddress';

import fetchApartmentsRequest from '../actions/apartments'
import { openMap, closeMap } from '../actions/googleMap';

class App extends Component {
  constructor(props) {
    super(props);

    this.props.fetchApartmentsRequest();
  }

  render() {
    const { apartments: { apartments }, googleMap: { isOpen } } = this.props;
    return (
      <div className="container">
        <NavBar />
        <HeroCTA
        openMap={this.props.openMap}
        />
        <ApartmentMap
          isOpen={isOpen}
          markers={apartments}
          closeMap={this.props.closeMap}
        />
      </div>
    );
  }
}

export default connect(({ apartments, googleMap}) => ({ apartments, googleMap }), { fetchApartmentsRequest, openMap, closeMap })(App);
