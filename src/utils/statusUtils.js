import { find, isObject } from 'lodash';

export const getStatus = (item, statusData) => {
  const status = find(statusData, { id: item.status});

  if (!isObject(status)) {
    return '';
  }

  return status.description;
};