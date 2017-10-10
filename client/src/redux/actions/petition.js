import { browserHistory } from 'react-router';
import createApiRequest from '../../utils/createApiRequest';

export function addSignatureToPetition() {
  return {
    type: 'ADD_SIGNATURE_TO_PETITION',
    promise: createApiRequest('petitions', 'POST')
  };
}