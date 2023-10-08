import { request } from './request.js';
import { deepClone } from './utils.js';

function rename(name) {
  const { dbPrefix } = useRuntimeConfig().public;
  return name.includes('*') ? name.replace('*', '') : dbPrefix + '_' + name;
}

export const upsert = async function (table, data) {
  table = rename(table);
  data = deepClone(data);
  delete data.state;
  let response = await request(
    '/upsert/' + table,
    'POST',
    JSON.stringify(data),
  );
  return response;
};

export const getAll = async function (table, projection) {
  table = rename(table);
  let response = await request(
    'all' + '/' + table + (projection ? '/' + projection : ''),
    'GET',
  );
  return response;
};

export const sample = async function (table, limit) {
  table = rename(table);
  let response = await request('sample' + '/' + table + '/' + limit, 'GET');
  return response;
};

export const query = async function (table, queryName, queryValue, projection) {
  table = rename(table);
  if (typeof queryValue === 'object') {
    let response = await request(
      'query' +
        '/' +
        table +
        '/' +
        queryName +
        (projection ? '/' + projection : ''),
      'POST',
      JSON.stringify(queryValue),
    );
    return response;
  }
  let response = await request(
    'query' +
      '/' +
      table +
      '/' +
      queryName +
      '/' +
      queryValue +
      (projection ? '/' + projection : ''),
    'GET',
  );

  return response;
};

export const getById = async function (table, id, projection) {
  table = rename(table);
  return await request(
    'id' + '/' + table + '/' + id + (projection ? '/' + projection : ''),
    'GET',
  );
};

export const dbDelete = async function (table, list) {
  table = rename(table);
  // if list is not an array but a single id, convert it to an array
  if (!Array.isArray(list)) {
    list = [list];
  }
  request('delete' + '/' + table, 'post', list);
};
