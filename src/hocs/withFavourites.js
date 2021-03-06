import React from 'react';
import { FavouritesConsumer } from '../context/FavouritesProvider';

const withFavourites = Component => props => (
  <FavouritesConsumer>
    {value => <Component {...props} favourites={value} />}
  </FavouritesConsumer>
);

export default withFavourites;