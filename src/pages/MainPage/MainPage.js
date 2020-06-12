import React from 'react';
import {
  View,
  StatusBar,
  Platform,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LaunchList from '../../modules/Launches/components/LaunchList';
import FavouriteList from '../../modules/Launches/components/FavouriteList';
import withFavourites from '../../context/withFavourites';
import FavouriteTabBarIcon from '../../modules/Launches/components/FavouriteTabBarIcon';

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
    <Tab.Screen name="launches" component={LaunchList}/>
    <Tab.Screen name="favourites" component={FavouriteList} options={{ tabBarIcon: FavouriteTabBarIcon }}/>
  </Tab.Navigator>
);

export default withFavourites(MainPage);

