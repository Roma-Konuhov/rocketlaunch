import { ajax } from 'rxjs/ajax';
import moment from 'moment';
import qs from 'qs';

import {
  ROCKETLAUNCH_SERVICE_URL,
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_SORT_ORDER,
} from '../constants/apiConstants';

export const fetch = ({
  uri,
  enddate,
  sort,
  mode,
  limit = DEFAULT_ITEMS_PER_PAGE,
  page = 0,
}) => {
  const params = {
    limit,
    offset: page*limit,
    sort,
    enddate,
    mode,
  };
  const querystring = qs.stringify(params);
  const url = `${ROCKETLAUNCH_SERVICE_URL}${uri}?${querystring}`;

  return ajax.getJSON(url);
};

export const fetchLaunches = page => fetch({
  uri: 'launch',
  page,
  enddate: moment().format('YYYY-MM-DD'),
  sort: DEFAULT_SORT_ORDER,
  mode: 'verbose',
});

export const fetchLaunchStatuses = () => fetch({ uri: 'launchstatus' });
