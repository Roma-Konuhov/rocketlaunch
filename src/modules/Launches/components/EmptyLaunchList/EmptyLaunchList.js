import React from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#333',
    flexWrap: 'wrap',
  },
});

const EmptyLaunchList = () => (
  <Text style={styles.text}>Data is not available</Text>
);

export default EmptyLaunchList;