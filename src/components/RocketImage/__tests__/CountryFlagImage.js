import 'react-native';
import React from 'react';
import RocketImage from '../RocketImage';

import {
  cleanup,
  render
} from '@testing-library/react-native';

import * as utils from '../../../utils/launchDataUtils';

describe('Component CountryFlagImage', () => {
  afterEach(cleanup);

  test('renders with proper country code URL', () => {
    const imageUrl = 'imageUrl';
    utils.getImageUrl = jest.fn().mockReturnValue({ uri: imageUrl });

    const { queryByTestId } = render(<RocketImage item={{}} />);
    expect(queryByTestId('rocket-image')).toHaveProp('source', { uri: imageUrl });
  });
});