import React from 'react';
import { LaunchConsumer } from '../context/LaunchProvider';

const withLaunchData = Component => props => (
  <LaunchConsumer>
    {value => <Component {...props} launchData={value} />}
  </LaunchConsumer>
);

export default withLaunchData;