import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  StatusProvider,
  LaunchProvider,
  FavouritesProvider,
} from './context';
import MainPage from './pages/MainPage';

const Stack = createStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="main" component={MainPage} options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>
);

export default () => (
  <StatusProvider>
    <LaunchProvider>
      <FavouritesProvider>
        <Navigation/>
      </FavouritesProvider>
    </LaunchProvider>
  </StatusProvider>
);
