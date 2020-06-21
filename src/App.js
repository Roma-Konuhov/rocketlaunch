import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { get } from 'lodash';

import MainPage from './pages/MainPage';
import WebViewPage from './pages/WebViewPage';
import FavouritesIcon from './components/FavouritesIcon';
import {
  ROUTE_MAIN,
  ROUTE_WEBVIEW
} from './constants/navigationConstants';

const Stack = createStackNavigator();

const mainPageOptions = {
  title: 'Launches',
  headerShown: false,
};

const renderFavouritesIcon = route => () =>
  <FavouritesIcon
    isActive={get(route, 'params.isFavourite')}
    isTouchable={false}
    color="#90abd9"
  />;

const webViewPageOptions = ({ route }) => ({
  title: get(route, 'params.name'),
  headerRight: renderFavouritesIcon(route),
  headerTitleStyle: {
    fontSize: 16,
    color: '#fff',
  },
  headerTitleAlign: 'center',
  ...Platform.select({
    ios: {
      // probably it's not needed, but I had a glitch
      // when a header overlaps a status bar on IOS
      headerStatusBarHeight: 20
    }
  }),
  headerStyle: {
    backgroundColor: '#01042b',
  },
  headerBackTitleStyle: {
    color: '#90abd9',
  },
  headerTintColor: '#90abd9'
});

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={ROUTE_MAIN} component={MainPage} options={mainPageOptions}/>
      <Stack.Screen name={ROUTE_WEBVIEW} component={WebViewPage} options={webViewPageOptions}/>
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;