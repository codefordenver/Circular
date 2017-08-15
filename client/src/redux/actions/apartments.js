import createApiRequest from '../../utils/createApiRequest';

export function fetchApartmentsRequest() {
  return {
    type: 'APARTMENTS',
    promise: createApiRequest('campaigns', 'GET')
  };
}

export function beginAddressSearch() {
  return {
    type: 'FETCH_NEARBY_CAMPAIGNS_REQUEST'
  };
}

export function searchGoogleForAddress(address, searchAddressHelper) {
  return {
    type: 'VALIDATE_ADDRESS',
    promise: searchAddressHelper(address)
  };
}

export function getLatLong(places, latLngHelper) {
  const place = places[0];
  return {
    type: 'GET_LAT_LONG',
    promise: latLngHelper(place)
  };
}

export function fetchNearbyCampaigns(latLng) {
  return {
    type: 'FETCH_NEARBY_CAMPAIGNS',
    promise: createApiRequest(`campaigns/find?lat=${latLng.lat}&lng=${latLng.lng}`, 'GET')
  };
}

export function clearSearchResults() {
  return {
    type: 'CLEAR_SEARCH_RESULTS'
  };
}

export function searchAddressFlow(address, searchAddressHelper, latLngHelper) {
  return async (dispatch) => {
    dispatch(beginAddressSearch());
    const places = await dispatch(searchGoogleForAddress(address, searchAddressHelper));
    if (places.error) { return; }
    const latLng = await dispatch(getLatLong(places.response, latLngHelper));
    if (latLng.error) { return; }
    dispatch(fetchNearbyCampaigns(latLng.response));
  };
}
