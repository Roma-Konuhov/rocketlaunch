import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import { compose } from 'recompose';

import withStatusData from '../../../../context/withStatusData';
import withLaunchData from '../../../../context/withLaunchData';
import LaunchItem from '../LaunchItem';
import EmptyLaunchList from '../EmptyLaunchList';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
  }
});

const LaunchList = ({ statusData = {}, launchData = {} }) => {
  const loadNextPage = () => {
    !launchData.isLoading &&
    launchData.hasNextPage &&
    launchData.fetchNextPage();
  };

  console.log(launchData.page)

  const renderFooterSpinner = useMemo(() => {
    if (launchData.isInitialized && !launchData.isLoading) {
      return null;
    }

    return <Text>loading...</Text>;
  }, [launchData.isInitialized, launchData.isLoading]);

  if (!statusData.isInitialized && statusData.isLoading || !launchData.isInitialized && launchData.isLoading) {
    return (
      <View style={styles.container}>
        <Text>loading...</Text>
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
        refreshing={launchData.isLoading}
        onRefresh={launchData.reset}
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