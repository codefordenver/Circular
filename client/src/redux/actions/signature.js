import { browserHistory } from 'react-router';
import createApiRequest from '../../utils/createApiRequest';

export function addSignatureToCampaign(userId, campaignId) {
  let data = { user_id: userId, campaign_id: campaignId }
  return {
    type: 'ADD_SIGNATURE_TO_CAMPAIGN',
    promise: createApiRequest('signatures', 'POST', data)
  };
}

export default function fetchSignatures(campaign_id) {
  return {
    type: 'FETCH_SIGNATURES',
    promise: createApiRequest(`signatures/${campaign_id}`, 'GET')
  };
}


