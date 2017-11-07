import { browserHistory } from 'react-router';
import createApiRequest from '../../utils/createApiRequest';

import { UPDATE_NEW_CAMPAIGN } from '../constants/newCampaign';

export function createCampaign(campaignInfo) {
  return {
    type: 'CREATE_NEW_CAMPAIGN',
    promise: createApiRequest('api/campaigns', 'POST', { ...campaignInfo })
  };
}

export function updateNewCampaign(data) {
  return {
    type: UPDATE_NEW_CAMPAIGN,
    data
  };
}
