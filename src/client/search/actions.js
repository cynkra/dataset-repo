import setToString from '../../lib/settostring';
import {dispatch, dispatchAsync} from '../dispatcher';
import {getForm} from './store';
import {getSearchResults} from '../../services/dataset/fetcher';
import resolver from '../../lib/resolver';

export function onSearchInputChange({target: {name, value}}) {
  dispatch(onSearchInputChange, value);
}

export function onSearchFormSubmitted(e) {
  e.preventDefault();
  submitSearchForm();
}

export function onFilterCheckboxChange({target: {name, value, checked}}) {
  dispatch(onFilterCheckboxChange, {name, value, checked});
  submitSearchForm();
}

function submitSearchForm() {
  const router = require('../router');
  const query = getForm().toJS();

  return isQueryEmpty(query)
    ? router.transitionTo('home')
    : router.transitionTo('search', null, query);
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
  onSearchInputChange, onSearchFormSubmitted, onFilterCheckboxChange,
  fetchSearchResults, fetchSearchResultsStart, fetchSearchResultsSuccess
});
