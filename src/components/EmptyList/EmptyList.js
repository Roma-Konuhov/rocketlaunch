import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './styles';

const EmptyList = () => (
  <View style={styles.container}>
    <Text style={styles.text}>List is empty</Text>
  </View>
);

export default EmptyList;