import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApartmentMap from '../components/ApartmentMap/apartmentmap';
import NavBar from '../components/Navbar/navbar';
import HeroCTA from '../components/HeroCTA';

import fetchApartmentsRequest from '../actions/apartments'

class App extends Component {
  constructor(props) {
    super(props);

    this.props.fetchApartmentsRequest();
  }

  render() {
    const { apartments: { apartments } } = this.props;
    const isOpen = false;
    return (
      <div className="container">
        <NavBar />
        <HeroCTA
        openMap={() => null}
        />
        <ApartmentMap
          isOpen={isOpen}
          markers={apartments}
          closeMap={() => null}
        />
      </div>
    );
  }
}

export default connect(({ apartments, map}) => ({ apartments, map }), { fetchApartmentsRequest })(App);
