import React from 'react';
import { FlatList } from 'react-native';

import withFavourites from '../../../../context/withFavourites';
import EmptyLaunchList from '../EmptyLaunchList';
import LaunchItem from '../LaunchItem';

const FavouriteList = ({ favourites }) => {
  if (favourites.isEmpty) {
    return <EmptyLaunchList />
  }

  return (
    <FlatList
      data={favourites.list}
      renderItem={LaunchItem}
      keyExtractor={item => '' + item.id}
    />
  )
};

export default withFavourites(FavouriteList);