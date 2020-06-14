import { Image } from 'react-native';
import React from 'react';

import { getCountryFlagUrl } from '../../utils';

import styles from './styles';

const CountryFlagImage = ({ item }) =>
  <Image
    testID="country-flag-image"
    source={getCountryFlagUrl(item)}
    style={styles.image}
  />;

export default CountryFlagImage;