import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import * as _ from "lodash";

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const GettingStartedGoogleMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={12}
      defaultCenter={{ lat: 39.7392, lng: -104.9903 }}
      onClick={props.onMapClick}
    >
      {props.markers.map(marker => (
        <Marker
          {...marker}
          onRightClick={() => props.onMarkerRightClick(marker)}
        />
      ))}
    </GoogleMap>
)));
class ApartmentMap extends Component {
  render() {
    const mapUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;
    return (
      <div>
        <button className="close_map_button" onClick={this.props.closeMap}>X</button>
        <GettingStartedGoogleMap
          googleMapURL={mapUrl}
          loadingElement={
            <div style={{ height: `100%` }}>
              {/*<FaSpinner
                style={{
                  display: `block`,
                  width: `80px`,
                  height: `80px`,
                  margin: `150px auto`,
                  animation: `fa-spin 2s infinite linear`,
                }}
              />*/}
            </div>
          }
          containerElement={
            <div style={{ height: `50vh` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={_.noop}
          onMapClick={_.noop}
          markers={this.props.markers}
          onMarkerRightClick={_.noop}
        />
      </div>
    );
  }
}

export default ApartmentMap;
