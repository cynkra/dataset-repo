import setToString from '../../lib/settostring';
import {dispatch, dispatchAsync} from '../dispatcher';
import {getSearchResults} from '../../services/dataset/fetcher';
import resolver from '../../lib/resolver';

export function onSearchInputChange({target: {name, value}}) {
  dispatch(onSearchInputChange, value);
}

export function fetchSearchResults(query: string) {
  fetchSearchResultsStart(query);
  const promise = (resolve) => {
    getSearchResults(query)
      .then((data) => {
        fetchSearchResultsSuccess(data);
        resolve();
      });
  };
  return dispatchAsync(fetchSearchResults, resolver.resolve(promise));
}

export function fetchSearchResultsStart(query) {
  dispatch(fetchSearchResultsStart, query);
}

export function fetchSearchResultsSuccess(data) {
  dispatch(fetchSearchResultsSuccess, data);
}

setToString('search', {
  onSearchInputChange, fetchSearchResults, fetchSearchResultsStart, fetchSearchResultsSuccess
});
