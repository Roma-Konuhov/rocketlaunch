import qs from 'qs';

import {
  DEFAULT_ITEMS_PER_PAGE,
} from '../constants/apiConstants';

export const getQueryString = ({
  enddate,
  sort,
  mode,
  searchTerm,
  limit = DEFAULT_ITEMS_PER_PAGE,
  page = 0,
} = {}) => {
  const params = {
    limit,
    offset: page*limit,
  };

  if (mode) params.mode = mode;
  if (sort) params.sort = sort;
  if (enddate) params.enddate = enddate;
  if (searchTerm) params.name = searchTerm;

  return qs.stringify(params);
};