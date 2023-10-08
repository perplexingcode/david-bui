import { v4 } from 'uuid';

export const unwrap = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};
export const deepClone = function (obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  return JSON.parse(JSON.stringify(obj));
};

export const removeState = function (obj) {
  delete obj.state;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      delete item.state;
    }
  }
  return obj;
};
export const dir = function (path) {
  const config = useRuntimeConfig();
  const rootDir = config.rootDir;
  return rootDir + '/' + path;
};

export const newId = function () {
  return v4().replace(/-/g, '').slice(0, 12);
};

export const deepCompare = function (obj1, obj2) {
  // Compare object types
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // Compare null values
  if (obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }

  // Compare primitive values
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }

  // Compare arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (let i = 0; i < obj1.length; i++) {
      if (!deepCompare(obj1[i], obj2[i])) {
        return false;
      }
    }
    return true;
  }

  // Compare objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepCompare(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

export const cloudOverride = function (obj, cloudObj) {
  if (!cloudObj) return;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] !== cloudObj[key]) {
        obj[key] = cloudObj[key];
      }
    }
  }
};
