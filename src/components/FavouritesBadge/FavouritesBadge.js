import {
  Text,
  View
} from 'react-native';
import React from 'react';

import withFavourites from '../../hocs/withFavourites';

import styles from './styles';

const FavouritesBadge = ({ favourites = {} }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{favourites.amount}</Text>
  </View>
);

export default withFavourites(FavouritesBadge);