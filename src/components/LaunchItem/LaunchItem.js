import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { compose } from 'recompose';
import { useNavigation } from '@react-navigation/native';

import withStatusData from '../../hocs/withStatusData';
import withFavourites from '../../hocs/withFavourites';
import {
  getStatus,
  getLaunchDate,
  getInfoUrl,
} from '../../utils';
import CountryFlagImage from '../CountryFlagImage';
import RocketImage from '../RocketImage';
import FavouriteIcon from '../FavouriteIcon';
import { ROUTE_WEBVIEW } from '../../constants/navigationConstants';

import styles from './styles';

const LaunchItem = ({
  item = {},
  statusData = {},
  favourites = {},
}) => {
  const navigation = useNavigation();

  const toggleFavourites = () => {
    favourites.has(item) ? favourites.remove(item) : favourites.add(item);
  };

  const openWebPage = () => navigation.navigate(ROUTE_WEBVIEW, {
    url: getInfoUrl(item),
    name: item.name,
    isFavourite: favourites.has(item)
  });

  return (
    <View style={styles.container}>
      <FavouriteIcon onPress={toggleFavourites} isActive={favourites.has(item)}/>
      <TouchableOpacity onPress={openWebPage} style={styles.subContainer}>
        <RocketImage item={item}/>
        <View style={styles.description}>
          <Text style={styles.header} ellipsizeMode="tail">{item.name}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{getLaunchDate(item)}</Text>
            <CountryFlagImage item={item}/>
          </View>
          <Text style={styles.status}>{getStatus(item, statusData.list)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const shouldUpdate = (
  { favourites: prevFavourites },
  { favourites, item }
) =>
  prevFavourites.has(item) === favourites.has(item);

export default compose(
  withFavourites,
  withStatusData,
)(React.memo(
  LaunchItem,
  shouldUpdate,
));
