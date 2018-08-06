import { push } from "react-router-redux";
import { campaignsRef, GeoPoint } from "../../firebase";

// FETCH NEARBY CAMPAIGNS REQUEST
export const FETCH_NEARBY_CAMPAIGNS_REQUEST = "FETCH_NEARBY_CAMPAIGNS_REQUEST";
export const fetchNearbyCampaignsRequest = () => ({
  type: FETCH_NEARBY_CAMPAIGNS_REQUEST
});

// FETCH NEARBY CAMPAIGNS SUCCESS
export const FETCH_NEARBY_CAMPAIGNS_SUCCESS = "FETCH_NEARBY_CAMPAIGNS_SUCCESS";
export const fetchNearbyCampaignsSuccess = nearbyCampaigns => ({
  type: FETCH_NEARBY_CAMPAIGNS_SUCCESS,
  response: nearbyCampaigns
});

// SET EXACT MATCH
export const SET_EXACT_CAMPAIGN_MATCH = "SET_EXACT_CAMPAIGN_MATCH";
export const setExactCampaignMatch = exactAddressMatch => ({
  type: SET_EXACT_CAMPAIGN_MATCH,
  response: exactAddressMatch[0]
});

// GENERATE GEOSEARCH BOUNDRIES / DEFAULT RADIUS == 1
const getGeoSearchBoundries = (geoPoint, radius = 1) => {
  // SET GEOPOINT PARAMS
  const geoSpacial = {
    oneLat: 0.0144927536231884,
    oneLng: 0.0181818181818182,
    searchRadius: radius
  };
  const { _lat, _long } = geoPoint;
  // GET UPPER AND LOWER BOUNDRIES
  const lowerLat = _lat - _lat * geoSpacial.oneLat * geoSpacial.searchRadius;
  const lowerLng = _long - _long * geoSpacial.oneLng * geoSpacial.searchRadius;
  const upperLat = _lat + _lat * geoSpacial.oneLat * geoSpacial.searchRadius;
  const upperLng = _long + _long * geoSpacial.oneLng * geoSpacial.searchRadius;
  // CONVERT TO FIRESTORE GEOPOINTS
  const lowerGeoPoint = new GeoPoint(lowerLat, lowerLng);
  const upperGeoPoint = new GeoPoint(upperLat, upperLng);
  const geoSearchBoundries = { lowerGeoPoint, upperGeoPoint };
  return geoSearchBoundries;
};

// GENERATE GEOSEARCH RESULTS
const getGeoSearchResults = async geoSearchBoundries => {
  // #####
  // FIRESTORE HASN'T YET EXPOSED GEOQUERIES, THIS IS A WORK AROUND ;)
  // TODO EXPLORE GEOFIRESTORE LIBRARY
  // #####

  // SEARCH LOWERCAMPAIGNS
  const lowerCampaigns = [];
  const queryLower = campaignsRef.where(
    "latLng",
    ">",
    geoSearchBoundries.lowerGeoPoint
  );
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

  // ?? WHAT IN THE HECK ??
  // search lowerCampaigns2
  // const lowerCampaigns2 = [];
  // await campaignsRef
  //   .where('latLng', '>', geoSearchBoundries.lowerGeoPoint)
  //   .onSnapshot(querySnapshot => {
  //     querySnapshot.forEach(doc => {
  //       const data = doc.data();
  //       lowerCampaigns2.push({
  //         campaignId: data.campaignId,
  //         modifiedAt: data.modifiedAt,
  //         createdAt: data.createdAt,
  //         address: data.address,
  //         latLng: data.latLng
  //       });
  //     });
  //     console.log('lowerCampaigns2-inside-function-body: ', lowerCampaigns2);
  //   });
  // console.log('lowerCampaigns2-outside-function-body: ', lowerCampaigns2);

  // SEARCH UPPERCAMPAIGNS
  const upperCampaigns = [];
  const queryUpper = campaignsRef.where(
    "latLng",
    "<",
    geoSearchBoundries.upperGeoPoint
  );
  await queryUpper.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      upperCampaigns.push(doc.data().campaignId);
    });
  });

  // RETURN NEARBY CAMPAIGNS
  const nearbyCampaigns = lowerCampaigns.filter(campaign =>
    upperCampaigns.includes(campaign.campaignId)
  );
  return nearbyCampaigns;
};

// FETCH NEARBY CAMPAIGNS
export const firebaseFetchNearbyCampaigns = searchedGeoPoint => async dispatch => {
  dispatch(fetchNearbyCampaignsRequest());
  // SEARCH THE DATABASE FOR AN EXACT MATCH
  await campaignsRef
    .where("latLng", "==", searchedGeoPoint)
    .onSnapshot(querySnapshot => {
      const exactAddressMatch = [];
      querySnapshot.forEach(doc => {
        exactAddressMatch.push(doc.data());
      });
      if (exactAddressMatch) {
        // IF EXACT MATCH, DISPATCH EXACTMATCH
        dispatch(setExactCampaignMatch(exactAddressMatch));
      }
    });

  // GENERATE GEOSEARCH BOUNDRIES
  const geoSearchBoundries = await getGeoSearchBoundries(searchedGeoPoint, 1);
  const nearbyCampaigns = await getGeoSearchResults(geoSearchBoundries);
  dispatch(fetchNearbyCampaignsSuccess(nearbyCampaigns));
};

// STASH SEARCHED ADDRESS
export const FIREBASE_STASH_ADDRESS = "FIREBASE_STASH_ADDRESS";
export const firebaseStashAddress = (searchedAddress, searchedGeoPoint) => ({
  type: FIREBASE_STASH_ADDRESS,
  response: { searchedAddress, searchedGeoPoint }
});

// FIREBASE SEARCH ADDRESS FLOW
export const firebaseSearchAddressFlow = (
  searchedAddress,
  searchedGeoPoint,
  userHasSignedCampaign
) => async dispatch => {
  await dispatch(firebaseStashAddress(searchedAddress, searchedGeoPoint));
  dispatch(push({ pathname: "/choose-campaign", state: { searchedAddress } }));
  dispatch(firebaseFetchNearbyCampaigns(searchedGeoPoint));
  // TODO need to handle latLng error
  // if (error) console.log('Latlng error ', error);
};

// SELECT ADDRESS
export const FIREBASE_SELECT_INITIAL_SEARCH_ADDRESS = "FIREBASE_SELECT_ADDRESS";
export function selectAddress(selectedAddress) {
  return {
    type: FIREBASE_SELECT_INITIAL_SEARCH_ADDRESS,
    response: selectedAddress
  };
}

// CLEAR SERACH RESULTS
export const CLEAR_INITIAL_SEARCH_RESULTS = "CLEAR_INITIAL_SEARCH_RESULTS ";
export function clearInitialSearchResults() {
  return {
    type: CLEAR_INITIAL_SEARCH_RESULTS
  };
}
