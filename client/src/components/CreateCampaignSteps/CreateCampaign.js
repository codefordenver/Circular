import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash.noop';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { withRouter } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import SubmitButton from '../UtilComponents/SubmitButton';
import AddressHeading from '../UtilComponents/AddressHeading';
import IWantRecycling from '../UtilComponents/IWantRecycling';

class CreateCampaign extends React.Component {
  state = {
    creatingCampaign: false
  };

  _makeNewCampaign = async () => {
    this.setState({ creatingCampaign: true });
    const { auth, firebaseCreateNewCampaign, firebaseInitialSearch } = this.props;
    await firebaseCreateNewCampaign(
      firebaseInitialSearch.searchedAddress,
      firebaseInitialSearch.searchedGeoPoint,
      auth.uid
    );
    // Route redirect handleing in Redux
  };

  render() {
    const { firebaseInitialSearch } = this.props;
    const addressSplit = firebaseInitialSearch.searchedAddress.split(',');
    const addressMain = addressSplit[0];
    const addressSecond = `${addressSplit[1]} , ${addressSplit[2]} ${addressSplit[3]}`;

    return (
      <Grid>
        <Row>
          <Col xs={12} md={6} mdOffset={3} className="p-0 text-white">
            <IWantRecycling address={firebaseInitialSearch.searchedAddress} />
            <section style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              {/* <SearchMapCard initialSearch={firebaseInitialSearch} /> */}
              <div style={{ textAlign: 'end' }}>
                <ul>
                  <li>{addressMain}</li>
                  <li>{addressSecond}</li>
                </ul>
              </div>
            </section>
            <SubmitButton
              buttonText={'CREATE CAMPAIGN'}
              handleSelection={this._makeNewCampaign}
              name={'NEW_CAMPAIGN'}
              disabled={this.state.creatingCampaign}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

CreateCampaign.defaultProps = {
  firebaseInitialSearch: null
};

CreateCampaign.propTypes = {
  // activeCampaign
  auth: PropTypes.shape({
    status: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    uid: PropTypes.string
  }).isRequired,
  firebaseCreateNewCampaign: PropTypes.func.isRequired,
  firebaseInitialSearch: PropTypes.shape({
    searchedGeoPoint: PropTypes.shape({
      _lat: PropTypes.number.isRequired,
      _long: PropTypes.number.isRequired
    }).isRequired
  })
};

export default withRouter(CreateCampaign);

// const MapWithAMarker = withRouter(
//   withScriptjs(
//     withGoogleMap(props => (
//       <GoogleMap
//         ref={props.onMapLoad}
//         defaultZoom={10}
//         defaultCenter={{ lat: 39.7392, lng: -104.9903 }}
//         onClick={props.onMapClick}
//       >
//         <Marker
//           key={props.activeCampaign.campaignId}
//           position={{
//             lat: props.activeCampaign.latLng._lat,
//             lng: props.activeCampaign.latLng._long
//           }}
//           onRightClick={() => props.onMarkerRightClick(props.activeCampaign)}
//           onClick={() => props.router.push(`/campaign/${props.activeCampaign.campaignId}`)}
//           title={props.activeCampaign.address}
//         />
//       </GoogleMap>
//     ))
//   )
// );

// const SearchMapCard = ({ initialSearch }) => (
//   <div className="main-content">
//     <div className="card card-map">
//       <div className="header">
//         <h3 className="title text-center">{activeCampaign.address}</h3>
//       </div>
//       <div className="content">
//         <MapWithAMarker
//           googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${
//             process.env.REACT_APP_GOOGLE_MAPS_KEY
//           }`}
//           loadingElement={<div style={{ height: '100%' }} />}
//           containerElement={
//             <div
//               style={{
//                 width: '100%',
//                 height: '300px',
//                 position: 'relative',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 justifyContent: 'flex-end',
//                 alignItems: 'center'
//               }}
//             />
//           }
//           mapElement={<div style={{ height: '100%' }} />}
//           onMapLoad={noop}
//           onMapClick={noop}
//           activeCampaign={activeCampaign}
//           onMarkerRightClick={noop}
//         />
//       </div>
//     </div>
//   </div>
// );
