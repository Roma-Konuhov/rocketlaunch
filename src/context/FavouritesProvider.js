import React, {
  useState,
  useEffect
} from 'react';
import {
  isEmpty as arrayIsEmpty,
  remove as removeFromArray,
  findIndex,
  clone
} from 'lodash';

export const FavouritesContext = React.createContext();

export const FavouritesProvider = ({ children }) => {
  const [originalList, setOriginalList] = useState([]);
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    setList(getList());
  }, [originalList, searchTerm]);

  const getList = () => {
    if (searchTerm) {
      return originalList.filter(item => new RegExp(searchTerm, 'i').test(item.name));
    }
    return originalList;
  };

  const add = item => setOriginalList([...originalList, item]);

  const remove = item => {
    removeFromArray(originalList, { id: item.id });
    // the following row is required to update child components
    setOriginalList(clone(originalList));
  };

  const isEmpty = arrayIsEmpty(list);

  const has = item => findIndex(originalList, { id: item.id }) >= 0;

  const filterBy = searchTerm => setSearchTerm(searchTerm);

  const amount = originalList.length;

  return (
    <FavouritesContext.Provider value={{
      list,
      amount,
      add,
      remove,
      has,
      isEmpty,
      filterBy,
    }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const FavouritesConsumer = FavouritesContext.Consumer;
