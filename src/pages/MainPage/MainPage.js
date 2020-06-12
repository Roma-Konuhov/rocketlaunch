import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LaunchList from '../../modules/Launches/components/LaunchList';

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e6fcff',
  },
});

const tabBarOptions = {
  labelStyle: {
    fontSize: 12
  },
  tabStyle: {
    margin: 0,
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
  }
};

const MainPage = () => (
  <Tab.Navigator tabBarOptions={tabBarOptions}>
    <Tab.Screen name="launches" component={LaunchList} />
    <Tab.Screen name="favourites" component={LaunchList} />
  </Tab.Navigator>
);

export default MainPage;

