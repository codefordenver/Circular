import { push } from 'react-router-redux';
import { campaignsRef } from '../../firebase';

export const fetchNearbyCampaignsRequest = () => ({
  type: 'FETCH_NEARBY_CAMPAIGNS_REQUEST'
});

export const fetchNearbyCampaignsSuccess = exactAddressMatch => ({
  type: 'FETCH_NEARBY_CAMPAIGNS_SUCCESS',
  response: exactAddressMatch[0]
});

export const setExactCampaignMatch = exactAddressMatch => ({
  type: 'SET_EXACT_CAMPAIGN_MATCH',
  response: exactAddressMatch[0]
});

export const firebaseFetchNearbyCampaigns = searchedGeoPoint => async dispatch => {
  dispatch(fetchNearbyCampaignsRequest());
  // search the database for an exact match
  await campaignsRef.where('latLng', '==', searchedGeoPoint).onSnapshot(querySnapshot => {
    const exactAddressMatch = [];
    querySnapshot.forEach(doc => {
      exactAddressMatch.push(doc.data());
    });
    if (exactAddressMatch[0]) {
      // if exactMatch dispatch exactMatch
      dispatch(setExactCampaignMatch(exactAddressMatch));
    } else {
      // if no exactMatch dispatch fetchNearByCampaigns
      dispatch(fetchNearbyCampaignsSuccess(exactAddressMatch));
    }
  });
};

export const firebaseStashAddress = address => ({
  type: 'FIREBASE_STASH_ADDRESS',
  response: address
});

export const stashLatLng = latLng => ({
  type: 'FIREBASE_STASH_LAT_LNG',
  response: latLng
});

export const firebaseSearchAddressFlow = (address, searchedGeoPoint) => async dispatch => {
  await dispatch(firebaseStashAddress(address));
  await dispatch(stashLatLng(searchedGeoPoint));
  dispatch(push({ pathname: '/choose-campaign', state: { address } }));
  // TODO need to handle latLng error
  // if (error) console.log('Latlng error ', error);
  dispatch(firebaseFetchNearbyCampaigns(searchedGeoPoint));
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
