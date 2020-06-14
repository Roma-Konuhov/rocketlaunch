import 'react-native';
import React from 'react';
import FavouritesBadge from '../FavouritesBadge';

import {
  cleanup,
  render
} from '@testing-library/react-native';

jest.mock('../../../hocs/withFavourites', () =>
  Component => props => <Component {...props} favourites={{ amount: 5 }}/>
);

describe('Component FavouritesBadge', () => {
  afterEach(cleanup);

  test('renders with actual amount of favourite items', () => {
    const { queryByTestId } = render(<FavouritesBadge/>);
    expect(queryByTestId('favourite-badge')).toHaveTextContent('5');
  });
});