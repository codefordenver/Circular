import createApiRequest from '../utils/createApiRequest';

export function fetchApartmentsRequest() {
  return {
    type: 'APARTMENTS',
    promise: createApiRequest('apartments', 'GET')
  };
}

export function beginAddressSearch() {
  return {
    type: 'APARTMENT_MATCHES_REQUEST'
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
    type: 'APARTMENT_MATCHES',
    promise: createApiRequest(`apartments/find?lat=${latLng.lat}&lng=${latLng.lng}`, 'GET')
  };
}

export function clearSearchResults() {
  return {
    type: 'CLEAR_SEARCH_RESULTS'
  };
}


/* This doesn't work because each of the chained functions is returning an Object
rather than a Promise, I think, because dispatch isn't being passed down
in to the 'master promise', so these functions aren't actually being fired as
actions. This is what redux-thunk allows...the passing is of promises AND
functions, and it converts functions to promises itself, so you don't have
to be so careful about what you pass in. */
export function searchAddressFlow(address, searchAddressHelper, latLngHelper) {
  return {
    type: 'APARTMENT_MATCHES_REQUEST',
    promise: new Promise((resolve, reject) => {
      beginAddressSearch();
      searchGoogleForAddress(address, searchAddressHelper)
        .then(place => getLatLong(place.response, latLngHelper))
        .then(latLng => fetchNearbyCampaigns(latLng.response))
        .then((nearbys) => {
          if (!nearbys.response) { throw new Error(nearbys.error); }
          resolve(nearbys.response);
        })
        .catch(err => reject(err));
    })
  };
}

