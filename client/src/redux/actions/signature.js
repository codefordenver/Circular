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

export function addSignatureToCampaign(userId, campaignId) {
  const data = { user_id: userId, campaign_id: campaignId };
  return async (dispatch) => {
    dispatch(addsignature(data));
    dispatch(fetchSignatures(campaignId));
  };
}
