import React from 'react';
import { StatusConsumer } from './StatusProvider';

const withStatusData = Component => props => (
  <StatusConsumer>
    {value => <Component {...props} statusData={value} />}
  </StatusConsumer>
);

export default withStatusData;