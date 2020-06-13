import 'react-native';
import React from 'react';
import EmptyPage from '../EmptyPage';

import {
  cleanup,
  render
} from '@testing-library/react-native';

describe('Component EmptyPage', () => {
  afterEach(cleanup);

  test('renders correctly', () => {
    const { queryByTestId } = render(<EmptyPage />);
    expect(queryByTestId('text')).toHaveTextContent('There is no data yet');
  });
});