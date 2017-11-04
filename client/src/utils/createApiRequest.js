import axios from 'axios';

export default function createApiRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    axios({
      url: `/${url}`,
      method,
      data: data ? JSON.stringify(data) : null,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => resolve(response))
      .catch(err => reject(err.response));
  });
}
