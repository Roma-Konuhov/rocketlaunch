import { Image } from 'react-native';
import React from 'react';

import { getImageUrl } from '../../utils';
import { PLACEHOLDER_SIZE} from '../../constants/uiConstants';

const RocketImage = ({ item }) =>
  <Image
    source={{ uri: getImageUrl(item) }}
    style={{width: PLACEHOLDER_SIZE, height: PLACEHOLDER_SIZE }}
  />;

export default RocketImage;