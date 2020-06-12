import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { compose, withProps } from 'recompose';

import { LOOKUP_MIN_LENGTH_TO_TRIGGER } from '../../constants/uiConstants';
import withFavourites from '../../hocs/withFavourites';
import withLookupField from '../../hocs/withLookupField';
import EmptyList from '../EmptyList';
import LaunchItem from '../LaunchItem';

const FavouriteList = ({ favourites, searchTerm }) => {
  useEffect(() => {
    if (searchTerm && searchTerm.length > 0 && searchTerm.length < LOOKUP_MIN_LENGTH_TO_TRIGGER) {
      return;
    }
    favourites.filterBy(searchTerm);
  }, [searchTerm]);

  // EmptyList is returned here (not via prop ListEmptyComponent) intentionally
  if (favourites.isEmpty) {
    return <EmptyList />
  }

  return (
    <FlatList
      data={favourites.list}
      renderItem={LaunchItem}
      keyExtractor={item => '' + item.id}
    />
  )
};

export default compose(
  withFavourites,
  withProps({ debounceTime: 100 }),
  withLookupField,
)(FavouriteList);