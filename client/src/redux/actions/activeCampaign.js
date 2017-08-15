import createApiRequest from '../../utils/createApiRequest';

export default function fetchCampaignById(id) {
  return {
    type: 'FETCH_CAMPAIGN',
    promise: createApiRequest(`campaigns/${id}`, 'GET')
  };
}
