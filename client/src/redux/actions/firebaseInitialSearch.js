import { browserHistory } from 'react-router';
import { campaignsRef, GeoPoint } from '../../firebase';

export const beginAddressSearch = () => ({
  type: 'FIREBASE_BEGIN_NEARBY_CAMPAGNS_SEARCH'
});
export const fetchNearbyCampaignsRequest = () => ({
  type: 'FETCH_NEARBY_CAMPAIGNS_REQUEST'
});

export const fetchNearbyCampaignsSuccess = exactAddressMatch => ({
  type: 'FETCH_NEARBY_CAMPAIGNS_SUCCESS',
  response: exactAddressMatch
});

export const firebaseFetchNearbyCampaigns = searchedGeoPoint => async dispatch => {
  dispatch(fetchNearbyCampaignsRequest());
  // search the database for an exact match
  await campaignsRef.where('latLng', '==', searchedGeoPoint).onSnapshot(querySnapshot => {
    const exactAddressMatch = [];
    querySnapshot.forEach(doc => {
      exactAddressMatch.push(doc.data());
    });
    dispatch(fetchNearbyCampaignsSuccess(exactAddressMatch));
  });
};

export const stashAddress = address => ({
  type: 'FIREBASE_STASH_ADDRESS',
  response: address
});

export const stashLatLng = latLng => {
  const newGeoPoint = new GeoPoint(latLng._lat, latLng._long);
  return {
    type: 'FIREBASE_STASH_LAT_LNG',
    response: newGeoPoint
  };
};

export const firebaseSearchAddressFlow = (address, searchedGeoPoint) => async dispatch => {
  dispatch(beginAddressSearch());
  browserHistory.push('/choose-campaign');
  await dispatch(stashAddress(address));
  await dispatch(stashLatLng(searchedGeoPoint));
  // TODO need to handle latLng error
  // if (error) console.log('Latlng error ', error);
  return dispatch(firebaseFetchNearbyCampaigns(searchedGeoPoint));
};

export function selectAddress(selectedAddress) {
  return {
    type: 'SELECT_ADDRESS',
    response: selectedAddress
  };
}

export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export function clearSearchResults() {
  return {
    type: CLEAR_SEARCH_RESULTS
  };
}
