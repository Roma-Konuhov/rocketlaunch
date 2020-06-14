import 'react-native';
import React from 'react';
import View from 'react-native';
import {
  cleanup,
  render
} from '@testing-library/react-native';

import FavouriteIcon from '../FavouriteIcon';

jest.mock('@expo/vector-icons', () => {
  const View = require('react-native').View;
  return {
    AntDesign: props => <View {...props} />
}});

describe('Component FavouriteIcon', () => {

  afterEach(cleanup);

  test('renders `countered heart` icon if prop `isActive` is not passed or false', () => {
    const { queryByTestId } = render(<FavouriteIcon />);
    const iconHeart = queryByTestId('icon-hearto');
    expect(queryByTestId('touchable-favourite-icon')).toContainElement(iconHeart);
  });

  test('renders `filled heart` icon if prop `isActive` is true', () => {
    const { queryByTestId } = render(<FavouriteIcon isActive={true} />);
    const iconHeart = queryByTestId('icon-heart');
    expect(queryByTestId('touchable-favourite-icon')).toContainElement(iconHeart);
  });

  test('renders `untouchable` icon if prop `isTouchable` is false', () => {
    const { queryByTestId } = render(<FavouriteIcon isTouchable={false} />);
    const iconHeart = queryByTestId('icon-hearto');
    expect(queryByTestId('untouchable-favourite-icon')).toContainElement(iconHeart);
  });
});