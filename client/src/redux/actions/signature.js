import createApiRequest from '../../utils/createApiRequest';

export function addsignature(data) {
  return {
    type: 'ADD_SIGNATURE_TO_CAMPAIGN',
    promise: createApiRequest('api/signatures', 'POST', data)
  };
}

export function removeSignature(signatureId) {
  return {
    type: 'REMOVE_SIGNATURE_FROM_FROM_CAMPAIGN',
    promise: createApiRequest(`api/signatures/${signatureId}`, 'DELETE')
  };
}

export default function fetchCampaignSignatures(campaignId) {
  return {
    type: 'FETCH_CAMPAIGN_SIGNATURES',
    promise: createApiRequest(`api/signatures/campaigns/${campaignId}`, 'GET')
  };
}

export function fetchUserSignatures(userId) {
  return {
    type: 'FETCH_USER_SIGNATURES',
    promise: createApiRequest(`api/signatures/users/${userId}`, 'GET')
  };
}

export function addSignatureToCampaign(userId, checkboxes, campaignId) {
  const keepUpdated = checkboxes.has('Keep me updated on the status of this request');

  const data = { user_id: userId, campaign_id: campaignId, keepUpdated };
  return async dispatch => {
    await dispatch(addsignature(data));
    dispatch(fetchCampaignSignatures(campaignId));
  };
}

export function removeSignatureFromCampaign(campaignId, signatureId) {
  return async dispatch => {
    await dispatch(removeSignature(signatureId));
    dispatch(fetchCampaignSignatures(campaignId));
  };
}

export function logSignerOut() {
  return {
    type: 'LOG_OUT',
    promise: createApiRequest('api/logout', 'GET')
  };
}
