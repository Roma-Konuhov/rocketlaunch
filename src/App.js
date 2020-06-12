import * as React from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import {
  StatusProvider,
  LaunchProvider
} from './context';
import LaunchList from './modules/Launches/components/LaunchList';

export default function App() {
  return (
    <StatusProvider>
      <LaunchProvider>
        <View style={styles.container}>
          <LaunchList/>
        </View>
      </LaunchProvider>
    </StatusProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6fcff',
  },
});
