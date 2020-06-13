import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './styles';

const EmptyPage = () => (
  <View style={styles.container}>
    <Text style={styles.text} testID="text">There is no data yet</Text>
  </View>
);

export default EmptyPage;