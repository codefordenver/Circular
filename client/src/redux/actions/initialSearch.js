import { browserHistory } from 'react-router';
import createApiRequest from '../../utils/createApiRequest';

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
    dispatch(stashAddress(address));
    const latLng = await dispatch(getLatLong(address, latLngHelper));
    if (latLng.error) { return; }
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
    browserHistory.push(`/campaign/${response.id}`);
  };
}
