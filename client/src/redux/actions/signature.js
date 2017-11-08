import createApiRequest from '../../utils/createApiRequest';

export function addsignature(data) {
  return {
    type: 'ADD_SIGNATURE_TO_CAMPAIGN',
    promise: createApiRequest('api/signatures', 'POST', data)
  };
}

export default function fetchSignatures(campaignId) {
  return {
    type: 'FETCH_SIGNATURES',
    promise: createApiRequest(`api/signatures/${campaignId}`, 'GET')
  };
}

export function addSignatureToCampaign(userId, checkboxes, campaignId) {
  const keepUpdated = checkboxes.has('Keep me updated on the status of this request')

  const data = { user_id: userId, campaign_id: campaignId, keepUpdated: keepUpdated};
  return async (dispatch) => {
    dispatch(addsignature(data));
    dispatch(fetchSignatures(campaignId));
  };
}

export function logSignerOut() {
  return {
    type: 'LOG_OUT',
    promise: createApiRequest('api/logout', 'GET')
  };
}
