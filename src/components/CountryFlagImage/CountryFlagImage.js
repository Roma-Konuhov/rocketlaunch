import { Image } from 'react-native';
import React from 'react';

import { getCountryFlagUrl } from '../../utils';
import {
  COUNTRY_FLAG_WIDTH,
  COUNTRY_FLAG_HEIGHT
} from '../../constants/uiConstants';

const CountryFlagImage = ({ item }) =>
  <Image
    source={{ uri: getCountryFlagUrl(item) }}
    style={{ width: COUNTRY_FLAG_WIDTH, height: COUNTRY_FLAG_HEIGHT }}
  />;

export default CountryFlagImage;