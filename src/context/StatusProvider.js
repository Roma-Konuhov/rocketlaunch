import React from 'react';

import { fetchLaunchStatuses } from '../api/launches';
import DataProviderFactory from './DataProviderFactory';
import initialValues from './initialValues';

//       "id": 1,
//       "name": "Go",
//       "description": "Launch is GO",
//       "changed": "2017-02-21 00:00:00"

export const StatusContext = React.createContext(initialValues);

export const StatusProvider = DataProviderFactory({
  fetchFn: fetchLaunchStatuses,
  context: StatusContext,
  dataPath: 'types',
});

export const StatusConsumer = StatusContext.Consumer;
