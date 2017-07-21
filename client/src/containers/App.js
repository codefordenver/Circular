import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ApartmentMap from '../components/ApartmentMap/apartmentmap';
import NavBar from '../components/Navbar/navbar';
import HeroCTA from '../components/HeroCTA';

import { fetchApartmentsRequest } from '../actions/apartments';
import { openMap, closeMap } from '../actions/googleMap';

class App extends Component {
  componentWillMount() {
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

App.propTypes = {
  fetchApartmentsRequest: PropTypes.func.isRequired,
  apartments: PropTypes.shape({
    apartments: PropTypes.array.isRequired
  }).isRequired,
  googleMap: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired
  }).isRequired,
  openMap: PropTypes.func.isRequired,
  closeMap: PropTypes.func.isRequired
};

export default connect(
  ({ apartments, googleMap }) => ({ apartments, googleMap }),
  { fetchApartmentsRequest, openMap, closeMap })(App);
