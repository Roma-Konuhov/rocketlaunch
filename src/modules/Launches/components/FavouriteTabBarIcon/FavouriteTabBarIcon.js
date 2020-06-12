import {
  Text,
  View
} from 'react-native';
import React from 'react';

import withFavourites from '../../../../context/withFavourites';

import styles from './styles';

const FavouriteTabBarIcon = ({ favourites }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{favourites.list.length}</Text>
  </View>
);

export default withFavourites(FavouriteTabBarIcon);