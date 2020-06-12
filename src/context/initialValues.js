import noop from 'lodash/noop';

export default {
  list: [],
  isLoading: false,
  isInitialized: false,
  hasNextPage: noop,
  fetchNextPage: noop,
  reset: noop,
}