import {dispatch, dispatchAsync} from '../lib/dispatcher';
import {getDataset} from '../../services/dataset/fetcher';
import resolver from '../../lib/resolver';

export function fetchDataset(datasetTitle: string) {
  fetchDatasetStart();
  const promise = (resolve) => {
    getDataset(datasetTitle)
      .then((data) => {
        fetchDatasetSuccess(data);
        resolve();
      });
  };
  return dispatchAsync(fetchDataset, resolver.resolve(promise));
}

export function fetchDatasetStart() {
  dispatch(fetchDatasetStart);
}

export function fetchDatasetSuccess(data) {
  dispatch(fetchDatasetSuccess, data);
}
