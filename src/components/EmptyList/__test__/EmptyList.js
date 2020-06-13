import 'react-native';
import React from 'react';
import EmptyList from '../EmptyList';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<EmptyList />);
});
