import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { compose } from 'recompose';

import withStatusData from '../../../../context/withStatusData';
import withFavourites from '../../../../context/withFavourites';
import {
  getStatus,
  getLaunchDate
} from '../../utils';
import CountryFlagImage from '../CountryFlagImage';
import RocketImage from '../RocketImage';
import FavouriteIcon from '../FavouriteIcon';

import styles from './styles';

const LaunchItem = ({
  item = {},
  statusData = {},
  favourites = {}
}) => {
  const toggleFavourites = () => {
    favourites.has(item) ? favourites.remove(item) : favourites.add(item);
  };

  return (
    <View style={styles.container}>
      <FavouriteIcon onPress={toggleFavourites} isActive={favourites.has(item)} />
      <View style={styles.subContainer}>
        <RocketImage item={item}/>
        <View style={styles.description}>
          <Text style={styles.header} ellipsizeMode="tail">{item.name}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{getLaunchDate(item)}</Text>
            <CountryFlagImage item={item}/>
          </View>
          <Text style={styles.status}>{getStatus(item, statusData.list)}</Text>
        </View>
      </View>
    </View>
  );
};

export default compose(
  withFavourites,
  withStatusData
)(LaunchItem);