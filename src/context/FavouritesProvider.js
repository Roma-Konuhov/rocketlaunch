import React, { useState } from 'react';
import {
  isEmpty as arrayIsEmpty,
  remove as removeFromArray,
  findIndex,
  clone
} from 'lodash';

export const FavouritesContext = React.createContext();

export const FavouritesProvider = ({ children }) => {
  const [list, setList] = useState([]);

  const add = item => setList([...list, item]);

  const remove = item => {
    removeFromArray(list, { id: item.id });
    // the following row is required to update child components
    setList(clone(list));
  };

  const isEmpty = arrayIsEmpty(list);

  const has = item => findIndex(list, { id: item.id }) >= 0;

  return (
    <FavouritesContext.Provider value={{ list, add, remove, isEmpty, has }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const FavouritesConsumer = FavouritesContext.Consumer;
