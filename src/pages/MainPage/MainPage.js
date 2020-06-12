import React from 'react';
import {
  StatusBar,
  Platform,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LaunchList from '../../modules/Launches/components/LaunchList';
import FavouriteList from '../../modules/Launches/components/FavouriteList';
import withFavourites from '../../hocs/withFavourites';
import FavouritesBadge from '../../modules/Launches/components/FavouritesBadge';
import { ROUTE_LAUNCHES, ROUTE_FAVOURITES } from '../../constants/navigationConstants';

import styles from './styles';

const Tab = createMaterialTopTabNavigator();

const tabBarOptions = {
  labelStyle: {
    fontSize: 12,

  },
  tabStyle: {
    margin: 0,
    height: 60,
    flex: 1,
    justifyContent: 'flex-end',
    ...Platform.select({
      ios: {
        paddingTop: 30,
      },
      android: {
        paddingVertical: 0,
      },
    }),
  },
  indicatorStyle: {
    backgroundColor: '#ffd700'
  },
  showIcon: true,
};

const MainPage = () => (
  <Tab.Navigator tabBarOptions={tabBarOptions}>
    <Tab.Screen name={ROUTE_LAUNCHES} component={LaunchList}/>
    <Tab.Screen name={ROUTE_FAVOURITES} component={FavouriteList} options={{ tabBarIcon: FavouritesBadge }}/>
  </Tab.Navigator>
);

export default withFavourites(MainPage);

