import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import withStatusData from '../../../../context/withStatusData';
import {
  getStatus,
  getLaunchDate
} from '../../utils';
import CountryFlagImage from '../CountryFlagImage';
import RocketImage from '../RocketImage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    borderBottomColor: '#d7f1f4',
    borderBottomWidth: 1,
  },
  description: {
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1aeeff',
    flexWrap: 'wrap',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 10,
    color: '#333',
    marginRight: 10,
  },
  status: {
    fontSize: 12,
    color: '#333',
  }
});

const LaunchItem = ({ item = {}, statusData }) => {
  return (
    <View style={styles.container}>
      <RocketImage item={item}/>
      <View style={styles.description}>
        <Text style={styles.header} ellipsizeMode="tail">{item.name}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{getLaunchDate(item)}</Text>
          <CountryFlagImage item={item}/>
        </View>
        <Text style={styles.status}>{getStatus(item, statusData.list)}</Text>
      </View>
    </View>
  );
};

export default withStatusData(LaunchItem);