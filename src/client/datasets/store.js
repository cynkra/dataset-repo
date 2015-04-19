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
        return datasets.withMutations(list => {
          list.clear();
          data.forEach((row, i) => {
            const dataset = new Dataset({
              originalDatabaseName: row.original_database_name,
              description: row.description,
              databaseSize: row.database_size,
              tableCount: row.table_count,
              isArtificial: row.is_artificial,
              domain: row.domain,
              nullCount: row.null_count,
              numericCount: row.numeric_count,
              stringCount: row.string_count,
              lobCount: row.lob_count,
              dateCount: row.date_count,
              geoCount: row.geo_count
            }).toMap();
            list.push(dataset);
          });
        });
      });
      break;
    case actions.fetchDatasetSuccess:
      currentDatasetCursor(currentDataset => {
        const newDataset = new Dataset({
          originalDatabaseName: data.original_database_name,
          description: data.description,
          databaseSize: data.database_size,
          tableCount: data.table_count,
          isArtificial: data.is_artificial,
          domain: data.domain,
          nullCount: data.null_count,
          numericCount: data.numeric_count,
          stringCount: data.string_count,
          lobCount: data.lob_count,
          dateCount: data.date_count,
          geoCount: data.geo_count
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
