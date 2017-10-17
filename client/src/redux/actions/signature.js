import { browserHistory } from 'react-router';
import createApiRequest from '../../utils/createApiRequest';

export function addSignatureToCampaign() {
  debugger;
  return {
    type: 'ADD_SIGNATURE_TO_CAMPAIGN',
    promise: createApiRequest('signatures', 'POST')
  };
}

