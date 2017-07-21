export default function createApiRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    fetch(`/api/v1/${url}`, {
      method,
      body: data ? JSON.stringify(data) : null
    })
    .then(response => resolve(response.json()))
    .catch(err => reject(err));
  });
}
