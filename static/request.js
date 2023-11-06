export async function request(path, _options = {}) {
  const { backendUrl } = useRuntimeConfig().public;
  let options = {
    method: _options?.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (_options?.header) {
    options.headers = { ...options.headers, ..._options.headers };
  }
  options = { ...options, ..._options };
  if (options.method === 'GET') delete options?.body;
  if (options?.noCors) options.mode = 'no-cors';
  if (options?.noHeaders) delete options.headers;
  if (!path.includes('http')) path = backendUrl + '/' + path;
  return await useFetch(path, options);
}

export function fetchWrapper(data) {
  if (!data._rawValue) return ref([]);
  return data;
}
