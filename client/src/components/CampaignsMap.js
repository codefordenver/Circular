import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ReactModal from 'react-modal';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
// TODO import only what lodash files we need
import * as noop from 'lodash.noop';
// import * as _ from 'lodash';
import Loader from '../components/UtilComponents/FullScreenLoader';

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const GettingStartedGoogleMap = withRouter(
  withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={12}
        defaultCenter={{ lat: 39.7392, lng: -104.9903 }}
        onClick={props.onMapClick}
      >
        {props.markers.map(marker => (
          <Marker
            key={marker.campaignId}
            position={{ lat: marker.latLng._lat, lng: marker.latLng._long }}
            onRightClick={() => props.onMarkerRightClick(marker)}
            onClick={() => props.router.push(`/campaign/${marker.campaignId}`)}
            title={marker.address}
          />
        ))}
      </GoogleMap>
    ))
  )
);

const mapUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${
  process.env.REACT_APP_GOOGLE_MAPS_KEY
}`;

const CampaignsMap = props => (
  <ReactModal
    isOpen={props.isOpen}
    contentLabel="Modal"
    onRequestClose={props.closeMap}
    className="apartment-map-modal"
  >
    <GettingStartedGoogleMap
      googleMapURL={mapUrl}
      loadingElement={
        <div style={{ height: '100%' }}>
          <Loader
            style={{
              display: 'block',
              width: '80px',
              height: '80px',
              margin: '150px auto',
              animation: 'fa-spin 2s infinite linear'
            }}
          />
        </div>
      }
      containerElement={<div style={{ height: '100%' }} />}
      mapElement={<div style={{ height: '100%' }} />}
      onMapLoad={noop}
      onMapClick={noop}
      markers={props.markers}
      onMarkerRightClick={noop}
    />
  </ReactModal>
);

CampaignsMap.defaultProps = {
  markers: []
};

CampaignsMap.propTypes = {
  markers: PropTypes.arrayOf(PropTypes.object),
  isOpen: PropTypes.bool.isRequired,
  closeMap: PropTypes.func.isRequired
};

export default CampaignsMap;
