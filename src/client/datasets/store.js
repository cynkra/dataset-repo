import * as actions from './actions';
import {register} from '../dispatcher';
import {Record} from 'immutable';
import {datasetsCursor, currentDatasetCursor} from '../state';
import {getTagsFromDataset} from '../tags/store';

export const Dataset = Record({
  originalDatabaseName: null,
  description: null,
  databaseSize: null,
  tableCount: null,
  isArtificial: null,
  domain: null,
  nullCount: null,
  numericCount: null,
  stringCount: null,
  lobCount: null,
  dateCount: null,
  geoCount: null
});

export const dispatchToken = register(({action, data}) => {
  switch (action) {
    case actions.fetchDatasetsSuccess:
      datasetsCursor(datasets => {
        const dataset = new Dataset({
          originalDatabaseName: (new Date).getTime(),
          description: 'I am here'
        }).toMap();
        return datasets.push(dataset);
      });
      break;
    case actions.fetchDatasetSuccess:
      currentDatasetCursor(currentDataset => {
        const newDataset = new Dataset({
          originalDatabaseName: data,
          description: 'I am the new one.'
        }).toMap();
        return newDataset;
      });
      break;
  }
});

export function getDatasets() {
  return datasetsCursor();
}

export function getDataset() {
  return currentDatasetCursor();
}

export function getTags(dataset) {
  return getTagsFromDataset(dataset);
}
