export async function request(path, method, data, header, attr) {
  const { backendUrl } = useRuntimeConfig().public;
  let config = {
    method: method,
    body: data,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + attr?.token || sessionToken?.value,
    },
    data: data,
  };
  if (header) {
    config.headers = { ...config.headers, ...header };
  }
  if (method === 'GET') delete config.body;
  if (attr?.noCors) config.mode = 'no-cors';
  if (!path.includes('http')) path = backendUrl + '/' + path;
  return await useFetch(path, config);
}

export function fetchWrapper(data) {
  if (!data._rawValue) return ref([]);
  return data;
}
