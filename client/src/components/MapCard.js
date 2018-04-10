import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import * as _ from 'lodash';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class MapCard extends Component {
  render() {
    const { apartments, campaignAddress } = this.props;
    console.log(apartments);
    const MapWithAMarker = withRouter(
      withScriptjs(
        withGoogleMap(props => (
          <GoogleMap
            ref={props.onMapLoad}
            defaultZoom={10}
            defaultCenter={{ lat: 39.7392, lng: -104.9903 }}
            onClick={props.onMapClick}
          >
            {props.markers.map(marker => (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onRightClick={() => props.onMarkerRightClick(marker)}
                onClick={() => props.router.push(`/campaign/${marker.id}`)}
                title={marker.street_address}
              />
            ))}
          </GoogleMap>
        ))
      )
    );

    const mapUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${
      process.env.REACT_APP_GOOGLE_MAPS_KEY
    }`;
    return (
      <div className="main-content">
        <div className="card card-map">
          <div className="header">
            <h3 className="title text-center">{campaignAddress}</h3>
          </div>
          <div className="content">
            <MapWithAMarker
              googleMapURL={mapUrl}
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
              markers={apartments}
              onMarkerRightClick={_.noop}
            />
          </div>
        </div>
      </div>
    );
  }
}

MapCard.propTypes = {
  apartments: PropTypes.arrayOf(PropTypes.object).isRequired,
  campaignAddress: PropTypes.string.isRequired
};

export default MapCard;
