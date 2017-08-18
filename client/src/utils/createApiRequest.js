export default function createApiRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    fetch(`/api/v1/${url}`, {
      method,
      body: data ? JSON.stringify(data) : null,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(response => resolve(response.json()))
    .catch(err => reject(err));
  });
}
