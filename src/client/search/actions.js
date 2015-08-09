import setToString from '../../lib/settostring';
import {getForm} from './store';
import {dispatch, dispatchAsync} from '../lib/dispatcher';
import {getSearchResults} from '../../services/dataset/fetcher';
import resolver from '../../lib/resolver';

export function onSearchInputChange(value) {
  dispatch(onSearchInputChange, value);
}

export function onFilterCheckboxChange({target: {name, value, checked}}) {
  name = name.substr(0, name.length - 2);
  dispatch(onFilterCheckboxChange, {name, value, checked});
  submitSearchForm();
}

export function submitSearchForm() {
  const router = require('../router');
  let query = getForm().toJS();

  if (isQueryEmpty(query)) { query = null; }

  router.transitionTo('search', null, query);
}

export function fetchSearchResults(query: Object) {
  fetchSearchResultsStart(query);
  const promise = (resolve) => {
    getSearchResults(getForm().toJS())
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

function isQueryEmpty(query) {
  for (let item in query) {
    if (query[item] !== '' && query[item].length !== 0) {
      return false;
    }
  }
  return true;
}

setToString('search', {
  onSearchInputChange, onFilterCheckboxChange, submitSearchForm,
  fetchSearchResults, fetchSearchResultsStart, fetchSearchResultsSuccess
});
