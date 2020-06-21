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
import FavouritesIcon from '../FavouritesIcon';
import { ROUTE_WEBVIEW } from '../../constants/navigationConstants';

import styles from './styles';

export const LaunchItem = ({
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
    <View style={styles.container} testID="item">
      <FavouritesIcon onPress={toggleFavourites} isActive={favourites.has(item)} />
      <TouchableOpacity onPress={openWebPage} style={styles.subContainer}>
        <RocketImage item={item}/>
        <View style={styles.description}>
          <Text style={styles.header} ellipsizeMode="tail" testID="header" numberOfLines={2}>{item.name}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date} testID="launch-date">{getLaunchDate(item)}</Text>
            <CountryFlagImage item={item}/>
          </View>
          <Text style={styles.status} testID="launch-status">{getStatus(item, statusData.list)}</Text>
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

const enhance = compose(
  withFavourites,
  withStatusData,
);

export default enhance(React.memo(
  LaunchItem,
  shouldUpdate,
));
