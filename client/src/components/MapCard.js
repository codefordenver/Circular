import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
// TODO FIGURE OUT WHAT LODASH PACKAGE AND ONLY IMPORT WHAT'S NEEDED
import * as _ from 'lodash';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapWithAMarker = withRouter(
  withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={10}
        defaultCenter={{ lat: 39.7392, lng: -104.9903 }}
        onClick={props.onMapClick}
      >
        <Marker
          key={props.activeCampaign.campaignId}
          position={{
            lat: props.activeCampaign.latLng._lat,
            lng: props.activeCampaign.latLng._long
          }}
          onRightClick={() => props.onMarkerRightClick(props.activeCampaign)}
          onClick={() => props.router.push(`/campaign/${props.activeCampaign.campaignId}`)}
          title={props.activeCampaign.address}
        />
      </GoogleMap>
    ))
  )
);

const MapCard = ({ activeCampaign }) => (
  <div className="main-content">
    <div className="card card-map">
      <div className="header">
        <h3 className="title text-center">{activeCampaign.address}</h3>
      </div>
      <div className="content">
        <MapWithAMarker
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${
            process.env.REACT_APP_GOOGLE_MAPS_KEY
          }`}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={
            <div
              style={{
                width: '100%',
                height: '300px',
                position: 'relative',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            />
          }
          mapElement={<div style={{ height: '100%' }} />}
          onMapLoad={_.noop}
          onMapClick={_.noop}
          activeCampaign={activeCampaign}
          onMarkerRightClick={_.noop}
        />
      </div>
    </div>
  </div>
);

MapCard.propTypes = {
  activeCampaign: PropTypes.arrayOf({
    address: PropTypes.string.isRequired,
    modifiedAt: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    latLng: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired
  }).isRequired
};

export default MapCard;
