import { browserHistory } from 'react-router';
import createApiRequest from '../../utils/createApiRequest';
import handleApiError from '../../utils/handleApiError'

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
    promise: createApiRequest(`campaigns/find?lat=${latLng.lat}&lng=${latLng.lng}`, 'GET')
  };
}

export function clearSearchResults() {
  return {
    type: 'CLEAR_SEARCH_RESULTS'
  };
}

export function searchAddressFlow(address, latLngHelper) {
  return async (dispatch) => {
    browserHistory.push('/choose-campaign');
    dispatch(beginAddressSearch());
    const latLng = await dispatch(getLatLong(address, latLngHelper));
    const addressWithLatlng = { ...address, latLng }
    dispatch(stashAddress(addressWithLatlng));
    if (latLng.error) {
      return console.error(latLng);
    }
    dispatch(fetchNearbyCampaigns(latLng.response));
  };
}

export function setCampaignInformation(campaignInfo) {
  return {
    type: 'SET_CAMPAIGN_INFORMATION',
    promise: createApiRequest('campaigns', 'POST', { campaignInfo })
  };
}

export function selectAddress(value) {
  return {
    type: 'SELECT_ADDRESS',
    value
  };
}

export function createCampaign(campaignInfo) {
  return async (dispatch) => {
    const { response } = await dispatch(setCampaignInformation(campaignInfo));
    if (response.errors) {
      dispatch(createCampaignFailure(response.errors));
    } else {
      browserHistory.push(`/campaign/${response.id}`);
    }
  };
}

export function createCampaignFailure(error) {
  return {
    type: 'CREATE_CAMPAIGN_FAILURE',
    error
  }
}
