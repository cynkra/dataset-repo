import setToString from '../../lib/settostring';
import {dispatch, dispatchAsync} from '../lib/dispatcher';
import {getContributors} from '../../services/contributor/fetcher';
import resolver from '../../lib/resolver';

export function fetchContributors() {
  fetchContributorsStart();
  const promise = (resolve) => {
    getContributors()
      .then((data) => {
        fetchContributorsSuccess(data);
        resolve();
      });
  };
  return dispatchAsync(fetchContributors, resolver.resolve(promise));
}

export function fetchContributorsStart() {
  dispatch(fetchContributorsStart);
}

export function fetchContributorsSuccess(data) {
  dispatch(fetchContributorsSuccess, data);
}

setToString('contributors', {
  fetchContributors, fetchContributorsStart, fetchContributorsSuccess
});
