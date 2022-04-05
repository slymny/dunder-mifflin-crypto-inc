
const HTTP_STATUS_NO_CONTENT = 204;

/**
 * Fetch data using an HTTP GET request.
 * @param {string} url The url to fetch from.
 */
export async function fetchData(url) {
  let data;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}  ${res.statusText}`);
  }

  if (res.status === HTTP_STATUS_NO_CONTENT) {
    data = null;
  } else {
    data = await res.json();
  }

  return data;
}

