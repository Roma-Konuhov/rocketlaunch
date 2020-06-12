import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { get } from 'lodash';

import {
  StatusProvider,
  LaunchProvider,
  FavouritesProvider,
} from './context';
import MainPage from './pages/MainPage';
import WebViewPage from './pages/WebViewPage';
import FavouriteIcon from './modules/Launches/components/FavouriteIcon';
import { ROUTE_MAIN, ROUTE_WEBVIEW } from './constants/navigationConstants';

const Stack = createStackNavigator();

const mainPageOptions = {
  title: 'Launches',
  headerShown: false,
};

const webViewPageOptions = ({ route }) => ({
  title: get(route, 'params.name'),
  headerRight: () => <FavouriteIcon isActive={get(route, 'params.isFavourite')} isTouchable={false} />
});

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={ROUTE_MAIN} component={MainPage} options={mainPageOptions}/>
      <Stack.Screen name={ROUTE_WEBVIEW} component={WebViewPage} options={webViewPageOptions}/>
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
