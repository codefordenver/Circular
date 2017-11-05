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
  const agree = checkboxes.has('I agree with the Terms of Agreement and Privacy Policy')

  const data = { user_id: userId, campaign_id: campaignId, keepUpdated: keepUpdated, agree: agree };
  return async (dispatch) => {
    dispatch(addsignature(data));
    dispatch(fetchSignatures(campaignId));
  };
}
