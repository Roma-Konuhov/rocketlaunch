import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { get } from 'lodash';

const DataProviderFactory = ({ fetchFn, context, dataPath = '' }) => ({ children }) => {
  const [list, setList] = useState([]);
  const [response, setResponse] = useState({});
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

  };

  const hasNextPage = response.offset + response.count < response.total;

  const fetchNextPage = useCallback(() => setPage(page + 1), [page]);

  // @refresh reset
  useEffect(() => {
    setIsLoading(true);
    const dataSubscription = fetchFn(page).subscribe(
      processSuccess,
      processError
    );

    return () => {
      dataSubscription.unsubscribe();
    };
  }, [page]);

  const reset = () => {
    setList([]);
    setPage(-1);
    setIsInitialized(false);
    fetchNextPage();
  };

  return (
    <context.Provider value={{
      list,
      page,
      reset,
      hasNextPage,
      fetchNextPage,
      isLoading,
      isInitialized
    }}>
      {children}
    </context.Provider>
  );
};

export default DataProviderFactory;
