import {dispatch, dispatchAsync} from '../lib/dispatcher';
import {getSummary} from '../../services/statistics/fetcher';
import resolver from '../../lib/resolver';

export function fetchSummary() {
  const promise = (resolve) => {
    getSummary()
      .then((data) => {
        fetchSummarySuccess(data);
        resolve();
      })
      .catch((error) => {
        fetchSummaryError(error);
        resolve(error);
      });
  };
  return dispatchAsync(fetchSummary, resolver.resolve(promise));
}
export function fetchSummarySuccess(data) { dispatch(fetchSummarySuccess, data); }
export function fetchSummaryError(error) { dispatch(fetchSummaryError, error); }
