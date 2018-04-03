import createApiRequest from '../../utils/createApiRequest';

export default function fetchSignedCampaigns(userId) {
  return {
    type: 'FETCH_SIGNED_CAMPAIGNS',
    promise: createApiRequest(`api/${userId}/signedCampaigns`, 'GET')
  };
}
