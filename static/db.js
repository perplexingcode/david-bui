import { request } from './request.js';
import { deepClone } from './utils.js';
import moment from 'moment';

function rename(name) {
  const { dbPrefix } = useRuntimeConfig().public;
  return name.includes('*') ? name.replace('*', '') : dbPrefix + '_' + name;
}

function validate(data, msg) {
  if (!data) {
    console.error(msg);
    return null;
  }
  return data;
}

function parse(response) {
  return response?.data?._rawValue;
}

export const removeState = function (obj) {
  delete obj.state;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      delete item.state;
    }
  }
  return obj;
};

export const upsert = async function (table, data) {
  table = rename(table);
  data = deepClone(data);
  removeState(data);
  const options = { method: 'POST', body: JSON.stringify(data) };
  await request('/upsert/' + table, options);
};

export const getAll = async function (table, projection) {
  table = rename(table);
  const path = 'all' + '/' + table + (projection ? '/' + projection : '');
  const response = await request(path);
  const data = parse(response);
  return validate(data, 'getAll: no data found for table ' + table);
};

export const sample = async function (table, limit) {
  table = rename(table);
  const response = await request('sample' + '/' + table + '/' + limit);
  const data = parse(response);
  return validate(data, 'sample: no data found for table ' + table);
};

export const query = async function (table, queryName, queryValue, projection) {
  table = rename(table);
  let path;
  let response;
  let data;
  if (typeof queryValue === 'object') {
    path =
      'query' +
      '/' +
      table +
      '/' +
      queryName +
      (projection ? '/' + projection : '');
    const options = { method: 'POST', body: JSON.stringify(queryValue) };
    response = await request(path, options);
    data = parse(response);
    return validate(data, 'query: no data found for query ' + path);
  }
  path =
    'query' +
    '/' +
    table +
    '/' +
    queryName +
    '/' +
    queryValue +
    (projection ? '/' + projection : '');
  response = await request(path);
  data = parse(response);
  return validate(data, 'query: no data found for query ' + path);
};

export const getById = async function (table, id, projection) {
  table = rename(table);
  const path =
    'id' + '/' + table + '/' + id + (projection ? '/' + projection : '');
  const response = await request(path);
  const data = parse(response);
  return validate(data, 'getById: no data found for id ' + id);
};

export const getByIdValue = async function (table, id, attribute) {
  table = rename(table);
  attribute = attribute || 'value';
  const path = 'id' + '/' + table + '/' + id;
  const response = await request(path);
  const data = parse(response)?.[attribute];
  return validate(data, 'getByIdValue: no data found for id ' + id);
};

async function setCache(id, value) {
  if (value._rawValue !== undefined) value = value._rawValue;
  const timestamp = moment().unix();
  await upsert('cache', { id, value, timestamp });
}

async function getCache(id) {
  return await getByIdValue('cache', id);
}

export const cache = {
  set: setCache,
  get: getCache,
};
export const dbDelete = async function (table, list) {
  table = rename(table);
  // if list is not an array but a single id, convert it to an array
  if (!Array.isArray(list)) {
    list = [list];
  }
  await request('delete' + '/' + table, { method: 'POST', body: list });
};
