import { trim } from 'lodash';

/**
 * Filter list by searchTerm
 *
 * @param list {Array}
 * @param searchTerm {string}
 * @param searchByField {string}
 * @returns {Array}
 */
export const filterList = (list = [], searchTerm, searchByField = 'name') => {
  const term = trim(searchTerm);

  if (!term) {
    return list;
  }

  return list.filter(
    item => new RegExp(term, 'i').test(item[searchByField])
  );
};