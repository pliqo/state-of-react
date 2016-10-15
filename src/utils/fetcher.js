export default function fetcher(url, cb) {
  return fetch(url)
      .then(response => response.json())
      .then(data => data).then(cb)
    .catch(err => console.error(url, err.toString()))
}