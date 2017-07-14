export default function createApiRequest(url, method, data) {
  fetch(url, {
    method,
    body: data ? JSON.stringify(data) : null
  })
  // Pipe the stuff
  .then(response => response.json())
  .catch((error) => {
    throw error;
  });
}
