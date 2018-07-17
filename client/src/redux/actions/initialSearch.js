import { browserHistory } from 'react-router';
import createApiRequest from '../../utils/createApiRequest';

export function fetchApartmentsRequest() {
  return {
    type: 'APARTMENTS',
    promise: createApiRequest('api/campaigns', 'GET')
  };
}

export function beginAddressSearch() {
  return {
    type: 'FETCH_NEARBY_CAMPAIGNS_REQUEST'
  };
}

export function stashAddress(address) {
  return {
    type: 'STASH_ADDRESS',
    address
  };
}

export function stashLatLng(latLng) {
  return {
    type: 'STASH_LAT_LNG',
    latLng
  };
}

export function getLatLong(address, latLngHelper) {
  return {
    type: 'GET_LAT_LONG',
    promise: latLngHelper(address)
  };
}

export function fetchNearbyCampaigns(latLng) {
  return {
    type: 'FETCH_NEARBY_CAMPAIGNS',
    promise: createApiRequest(`api/campaigns/find?lat=${latLng.lat}&lng=${latLng.lng}`, 'GET')
  };
}

export function clearSearchResults() {
  return {
    type: 'CLEAR_SEARCH_RESULTS'
  };
}

export function searchAddressFlow(address, latLngHelper) {
  return async dispatch => {
    // dispatch(push('/choose-campaign))
    dispatch.push('/choose-campaign');

    // dispatch(push({ path: '/choose-campaign', state: {term: 'foo'}}))
    dispatch(beginAddressSearch());
    const latLng = await dispatch(getLatLong(address, latLngHelper));
    const addressWithLatlng = { ...address, latLng };
    dispatch(stashAddress(addressWithLatlng));
    if (latLng.error) {
      return console.error('error latlng ', latLng);
    }
    return dispatch(fetchNearbyCampaigns(latLng.response));
  };
}

export function selectAddress(value) {
  return {
    type: 'SELECT_ADDRESS',
    value
  };
}
