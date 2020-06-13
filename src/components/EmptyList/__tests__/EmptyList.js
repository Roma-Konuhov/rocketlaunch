import 'react-native';
import React from 'react';
import EmptyList from '../EmptyList';

import {
  cleanup,
  render
} from '@testing-library/react-native';

describe('Component EmptyList', () => {
  afterEach(cleanup);

  test('renders correctly', () => {
    const { queryByTestId } = render(<EmptyList />);
    expect(queryByTestId('text')).toHaveTextContent('List is empty');
  });
});