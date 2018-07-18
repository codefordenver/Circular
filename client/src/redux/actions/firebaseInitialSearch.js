import { push } from 'react-router-redux';
import { campaignsRef, GeoPoint } from '../../firebase';

export const fetchNearbyCampaignsRequest = () => ({
  type: 'FETCH_NEARBY_CAMPAIGNS_REQUEST'
});

export const fetchNearbyCampaignsSuccess = nearbyCampaigns => ({
  type: 'FETCH_NEARBY_CAMPAIGNS_SUCCESS',
  response: nearbyCampaigns
});

export const setExactCampaignMatch = exactAddressMatch => ({
  type: 'SET_EXACT_CAMPAIGN_MATCH',
  response: exactAddressMatch[0]
});

// Generate serachBoundry / default radius == 1
const getGeoSearchBoundries = (geoPoint, radius = 1) => {
  // set geoSpacial Params
  const geoSpacial = {
    oneLat: 0.0144927536231884,
    oneLng: 0.0181818181818182,
    searchRadius: radius
  };
  const { _lat, _long } = geoPoint;
  // get upper and lower boundries of search box
  const lowerLat = _lat - _lat * geoSpacial.oneLat * geoSpacial.searchRadius;
  const lowerLng = _long - _long * geoSpacial.oneLng * geoSpacial.searchRadius;
  const upperLat = _lat + _lat * geoSpacial.oneLat * geoSpacial.searchRadius;
  const upperLng = _long + _long * geoSpacial.oneLng * geoSpacial.searchRadius;
  // convert to Firestore GeoPoints
  const lowerGeoPoint = new GeoPoint(lowerLat, lowerLng);
  const upperGeoPoint = new GeoPoint(upperLat, upperLng);
  const geoSearchBoundries = { lowerGeoPoint, upperGeoPoint };
  return geoSearchBoundries;
};

const getGeoSearchResults = async geoSearchBoundries => {
  // #####
  // FIRESTORE HASN'T YET EXPOSED GEOQUERIES, THIS IS A WORK AROUND ;)
  // TODO explore library GEOFirestore
  // #####

  // search lowerCampaigns
  const lowerCampaigns = [];
  const queryLower = campaignsRef.where('latLng', '>', geoSearchBoundries.lowerGeoPoint);
  await queryLower.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const data = doc.data();
      lowerCampaigns.push({
        campaignId: data.campaignId,
        modifiedAt: data.modifiedAt,
        createdAt: data.createdAt,
        address: data.address,
        latLng: data.latLng
      });
    });
  });
  // search upperCampaigns
  const upperCampaigns = [];
  const queryUpper = campaignsRef.where('latLng', '<', geoSearchBoundries.upperGeoPoint);
  await queryUpper.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      upperCampaigns.push(doc.data().campaignId);
    });
  });

  // return nearbyCampaigns;
  const nearbyCampaigns = lowerCampaigns.filter(campaign =>
    upperCampaigns.includes(campaign.campaignId)
  );
  return nearbyCampaigns;
};

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
    }
  });
  // generate search coordinates & radius
  const geoSearchBoundries = await getGeoSearchBoundries(searchedGeoPoint, 1);
  const nearbyCampaigns = await getGeoSearchResults(geoSearchBoundries);
  dispatch(fetchNearbyCampaignsSuccess(nearbyCampaigns));
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
