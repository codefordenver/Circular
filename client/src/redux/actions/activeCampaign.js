import createApiRequest from '../../utils/createApiRequest';

export default function fetchCampaignById(id) {
  return {
    type: 'FETCH_CAMPAIGN',
    promise: createApiRequest(`api/campaigns/${id}`, 'GET')
  };
}
