import { ajax } from 'rxjs/ajax';
import moment from 'moment';

import { getQueryString } from '../utils';
import {
  ROCKETLAUNCH_SERVICE_URL,
  DEFAULT_SORT_ORDER,
} from '../constants/apiConstants';

export const fetch = ({ uri, ...qsParams }) => {
  const querystring = getQueryString(qsParams);
  const url = `${ROCKETLAUNCH_SERVICE_URL}${uri}?${querystring}`;

  return ajax.getJSON(url);
};

export const fetchLaunches = ({ page, searchTerm }) => fetch({
  uri: 'launch',
  page,
  searchTerm,
  enddate: moment().format('YYYY-MM-DD'),
  sort: DEFAULT_SORT_ORDER,
  mode: 'verbose',
});

export const fetchLaunchStatuses = () => fetch({ uri: 'launchstatus' });
