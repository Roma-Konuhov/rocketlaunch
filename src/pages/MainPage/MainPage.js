import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import { ROUTE_MAIN } from '../../constants/navigationConstants';
import LaunchesPage from '../LaunchesPage';

import styles from './styles';

const MainPage = ({ navigation }) => {
  const [isAppStarted, setIsAppStarted] = useState(false);

  if (isAppStarted) {
    return <LaunchesPage />;
  }

  const launchApp = () => {
    setIsAppStarted(true);
    navigation.navigate(ROUTE_MAIN);
  };

  return (
    <ImageBackground source={require('./assets/sky.jpg')} style={styles.container}>
      <StatusBar hidden />
      <TouchableOpacity onPress={launchApp}>
        <Image source={require('./assets/startbutton256.png')} style={{ width: 256, height: 256 }} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default MainPage;

