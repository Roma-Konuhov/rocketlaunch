import { Image } from 'react-native';
import React from 'react';

import { getImageUrl } from '../../utils';

import styles from './styles';

const RocketImage = ({ item }) =>
  <Image
    source={{ uri: getImageUrl(item) }}
    style={styles.image}
  />;

export default RocketImage;