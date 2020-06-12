import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { get, isEmpty as arrayIsEmpty } from 'lodash';

const DataProviderFactory = ({ fetchFn, context, dataPath = '' }) => ({ children }) => {
  const [list, setList] = useState([]);
  const [response, setResponse] = useState({});
  const [searchTerm, setSearchTerm] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [page, setPage] = useState(0);

  const processSuccess = response => {
    setList([ ...list, ...get(response, dataPath, []) ]);
    setResponse(response);
    setIsLoading(false);
    setIsInitialized(true);
  };

  const processError = error => {
    setIsInitialized(true);
    setIsLoading(false);
    // { status: fail, msg: "failure message" }
    // If there is an error or no launches match your criteria, it will respond with a 404 and a json body.
  };

  const hasNextPage = response.offset + response.count < response.total;

  const fetchNextPage = useCallback(() => setPage(page + 1), [page]);

  const fetch = useCallback(({ searchTerm, page = 0 }) => {
    setList([]);
    setPage(page);
    setIsInitialized(false);
    setSearchTerm(searchTerm);
  }, []);

  // @refresh reset
  useEffect(() => {
    setIsLoading(true);
    const dataSubscription = fetchFn({ page, searchTerm }).subscribe(
      processSuccess,
      processError
    );

    return () => {
      dataSubscription.unsubscribe();
    };
  }, [page, searchTerm]);

  const isEmpty = arrayIsEmpty(list);

  return (
    <context.Provider value={{
      list,
      page,
      hasNextPage,
      fetch,
      fetchNextPage,
      isLoading,
      isInitialized,
      isEmpty,
    }}>
      {children}
    </context.Provider>
  );
};

export default DataProviderFactory;
