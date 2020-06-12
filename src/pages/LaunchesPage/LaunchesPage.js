import React from 'react';
import {
  View,
  Platform
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LaunchList from '../../components/LaunchList';
import FavouriteList from '../../components/FavouriteList';
import FavouritesBadge from '../../components/FavouritesBadge';
import {
  ROUTE_LAUNCHES,
  ROUTE_FAVOURITES,
} from '../../constants/navigationConstants';
import {
  FavouritesProvider,
  LaunchProvider,
  StatusProvider
} from '../../context';

import styles from './styles';

const Tab = createMaterialTopTabNavigator();

const tabBarOptions = {
  labelStyle: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
  tabStyle: {
    margin: 0,
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 30,
        height: 60,
        justifyContent: 'flex-end',
      },
      android: {
        paddingTop: 20,
        paddingBottom: 10,
        height: 50,
        justifyContent: 'flex-end',
      },
    }),
  },
  indicatorStyle: {
    backgroundColor: '#ffd700'
  },
  showIcon: true,
};

const LaunchesPage = () => (
  <StatusProvider>
    <LaunchProvider>
      <FavouritesProvider>

        <Tab.Navigator tabBarOptions={tabBarOptions}>
          <Tab.Screen name={ROUTE_LAUNCHES} component={LaunchList}/>
          <Tab.Screen name={ROUTE_FAVOURITES} component={FavouriteList} options={{ tabBarIcon: FavouritesBadge }}/>
        </Tab.Navigator>

      </FavouritesProvider>
    </LaunchProvider>
  </StatusProvider>
);

export default LaunchesPage;

