import setToString from '../../lib/settostring';
import {dispatch, dispatchAsync} from '../dispatcher';
import {getDataset, getDatasets} from '../../services/dataset/fetcher';
import resolver from '../../lib/resolver';

export function fetchDatasets() {
  fetchDatasetsStart();
  const promise = (resolve) => {
    getDatasets()
      .then((data) => {
        fetchDatasetsSuccess(data);
        resolve();
      });
  };
  return dispatchAsync(fetchDatasets, resolver.resolve(promise));
}

export function fetchDatasetsStart() {
  dispatch(fetchDatasetsStart);
}

export function fetchDatasetsSuccess(data) {
  dispatch(fetchDatasetsSuccess, data);
}

export function fetchDataset(datasetName: string) {
  fetchDatasetStart();
  const promise = (resolve) => {
    getDataset(datasetName)
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

setToString('datasets', {
  fetchDatasets, fetchDatasetsStart, fetchDatasetsSuccess,
  fetchDataset, fetchDatasetStart, fetchDatasetSuccess
});
