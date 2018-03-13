import createApiRequest from '../../utils/createApiRequest';

export function fetchWasteProviders() {
  return {
    type: 'FETCH_WASTE_PROVIDERS',
    promise: createApiRequest('api/waste_providers', 'GET')
  };
}

export function fetchWasteProviderById(id) {
  return {
    type: 'FETCH_WASTE_PROVIDER',
    promise: createApiRequest(`api/waste_provider/${id}`, 'GET')
  };
}
