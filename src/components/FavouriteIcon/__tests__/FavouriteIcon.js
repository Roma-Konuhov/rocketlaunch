import 'react-native';
import React from 'react';
import CountryFlagImage from '../FavouriteIcon';
import { AntDesign } from '@expo/vector-icons';

import { create, act } from 'react-test-renderer';

import {
  cleanup,
  render
} from '@testing-library/react-native';

describe('Component CountryFlagImage', () => {

  test('renders with proper country code URL', () => {
    const renderer = create(<FavouriteIcon />);
    expect(renderer.findByType(AntDesign).props.name).toBe('hearto');
  });
});