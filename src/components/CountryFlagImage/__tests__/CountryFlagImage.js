import 'react-native';
import React from 'react';
import CountryFlagImage from '../CountryFlagImage';

import {
  cleanup,
  render
} from '@testing-library/react-native';

import * as utils from '../../../utils/launchDataUtils';

describe('Component CountryFlagImage', () => {
  afterEach(cleanup);

  test('renders with proper country code URL', () => {
    const countryFlagUrl = 'countryFlagUrl';
    utils.getCountryFlagUrl = jest.fn().mockReturnValue(countryFlagUrl);

    const { queryByTestId } = render(<CountryFlagImage item={{}} />);
    expect(queryByTestId('country-flag-image')).toHaveProp('source', { uri: countryFlagUrl });
  });
});