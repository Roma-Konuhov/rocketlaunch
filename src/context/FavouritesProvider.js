import React, { useReducer } from 'react';
import {
  isEmpty as arrayIsEmpty,
  remove as removeFromArray,
  findIndex,
} from 'lodash';

import { filterList } from '../utils';

export const FavouritesContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      const listForAdd = [...state.originalList, action.item];
      return {
        ...state,
        list: filterList(listForAdd, state.searchTerm),
        originalList: listForAdd,
      };
    case 'remove':
      const listForRemove = [...state.originalList];
      removeFromArray(listForRemove, { id: action.item.id });
      return {
        ...state,
        list: filterList(listForRemove, state.searchTerm),
        originalList: listForRemove,
      };
    case 'filter':
      return {
        ...state,
        list: filterList(state.originalList, action.searchTerm),
        searchTerm: action.searchTerm,
      };
  }
};

export const FavouritesProvider = ({ children }) => {
  const initialState = {
    list: [],
    originalList: [],
    searchTerm: undefined,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const add = item => dispatch({ type: 'add', item });

  const remove = item => dispatch({ type: 'remove', item });

  const filterBy = searchTerm => dispatch({ type: 'filter', searchTerm });

  const has = item => findIndex(state.originalList, { id: item.id }) >= 0;

  const isEmpty = arrayIsEmpty(state.list);

  const amount = state.originalList.length;

  return (
    <FavouritesContext.Provider value={{
      ...state,
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
