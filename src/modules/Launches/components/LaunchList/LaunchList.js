import React, {
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { compose } from 'recompose';

import { LOOKUP_MIN_LENGTH_TO_TRIGGER } from '../../../../constants/uiConstants';
import withStatusData from '../../../../hocs/withStatusData';
import withLaunchData from '../../../../hocs/withLaunchData';
import withLookupField from '../../../../hocs/withLookupField';
import EmptyPage from '../EmptyPage';
import LaunchItem from '../LaunchItem';

import styles from './styles';

const LaunchList = ({ statusData = {}, launchData = {}, searchTerm }) => {
  useEffect(() => {
    if (searchTerm && searchTerm.length > 0 && searchTerm.length < LOOKUP_MIN_LENGTH_TO_TRIGGER) {
      return;
    }
    !launchData.isLoading &&
    launchData.fetch({ searchTerm })
  }, [searchTerm]);

  const loadNextPage = useCallback(() => {
    !launchData.isLoading &&
    launchData.hasNextPage &&
    launchData.fetchNextPage();
  }, [launchData]);

  // console.log('page', launchData.page)
  // console.log('searchText', searchTerm)

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
        ListEmptyComponent={EmptyPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooterSpinner}
      />
    </View>
  );
};

export default compose(
  withStatusData,
  withLaunchData,
  withLookupField,
)(LaunchList);