import React from 'react';
import { FlatList } from 'react-native';
import { compose } from 'recompose';

import withFavourites from '../../../../hocs/withFavourites';
import withLookupField from '../../../../hocs/withLookupField';
import EmptyPage from '../EmptyPage';
import LaunchItem from '../LaunchItem';

const FavouriteList = ({ favourites }) => {
  if (favourites.isEmpty) {
    return <EmptyPage />
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
  withLookupField,
)(FavouriteList);