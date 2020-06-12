import React, {
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { compose } from 'recompose';

import withStatusData from '../../../../context/withStatusData';
import withLaunchData from '../../../../context/withLaunchData';
import LaunchItem from '../LaunchItem';

import styles from './styles';

const LaunchList = ({ statusData = {}, launchData = {} }) => {
  const loadNextPage = useCallback(() => {
    !launchData.isLoading &&
    launchData.hasNextPage &&
    launchData.fetchNextPage();
  }, [launchData]);

  console.log('page', launchData.page)

  const renderFooterSpinner = useMemo(() => {
    if (!launchData.isInitialized || launchData.isInitialized && !launchData.isLoading) {
      return null;
    }

    return (
      <View style={styles.footerSpinnerContainer}>
        <ActivityIndicator size="small" color="#4db6ff" />
      </View>
    );
  }, [launchData.isInitialized, launchData.isLoading]);

  if (!statusData.isInitialized && statusData.isLoading ||
    !launchData.isInitialized && launchData.isLoading
  ) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4db6ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={launchData.list}
        renderItem={LaunchItem}
        keyExtractor={item => '' + item.id}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooterSpinner}
      />
      <Button
        onPress={loadNextPage}
        title="next"
      />
    </View>
  );
};

export default compose(
  withStatusData,
  withLaunchData,
)(LaunchList);