import createApiRequest from '../../utils/createApiRequest';

export function addsignature(data) {
  return {
    type: 'ADD_SIGNATURE_TO_CAMPAIGN',
    promise: createApiRequest('api/signatures', 'POST', data)
  };
}

export default function fetchSignatures(campaign_id) {
  return {
    type: 'FETCH_SIGNATURES',
    promise: createApiRequest(`api/signatures/${campaign_id}`, 'GET')
  };
}

export function addSignatureToCampaign(userId, checkboxes, campaignId) {
  console.log(checkboxes)
  const data = { user_id: userId, campaign_id: campaignId, checkboxes: checkboxes };
  return async (dispatch) => {
    dispatch(addsignature(data));
    dispatch(fetchSignatures(campaignId));
  };
}
