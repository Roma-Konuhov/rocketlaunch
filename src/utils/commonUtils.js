import { trim } from 'lodash';

/**
 * Filter list by searchTerm
 *
 * @param list {Array}
 * @param searchTerm {string}
 * @returns {Array}
 */
export const filterList = (list = [], searchTerm) => {
  const term = trim(searchTerm);

  if (!term) {
    return list;
  }

  return list.filter(
    item => new RegExp(term, 'i').test(item.name)
  );
};