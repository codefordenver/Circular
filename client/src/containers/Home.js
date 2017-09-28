import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeroCTA from '../components/HeroCTA';
import ApartmentMap from '../components/CampaignsMap';
import StepByStep from '../components/StepByStep';
import InfoAndLinks from '../components/InfoAndLinks';

import { fetchApartmentsRequest } from '../redux/actions/initialSearch';
import { openMap, closeMap } from '../redux/actions/googleMap';

class Home extends Component {
  componentWillMount() {
    this.props.fetchApartmentsRequest();
  }

  render() {
    const { initialSearch: { apartments }, googleMap: { isOpen } } = this.props;
    return (
      <div>
        <HeroCTA
          openMap={this.props.openMap}
        />
        <ApartmentMap
          isOpen={isOpen}
          markers={apartments}
          closeMap={this.props.closeMap}
        />
        <StepByStep />

        <InfoAndLinks />
      </div>
    );
  }
}

Home.propTypes = {
  fetchApartmentsRequest: PropTypes.func.isRequired,
  initialSearch: PropTypes.shape({
    apartments: PropTypes.array.isRequired
  }).isRequired,
  googleMap: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired
  }).isRequired,
  openMap: PropTypes.func.isRequired,
  closeMap: PropTypes.func.isRequired
};

export default connect(
  ({ initialSearch, googleMap }) => ({ initialSearch, googleMap }),
  { fetchApartmentsRequest, openMap, closeMap })(Home);
