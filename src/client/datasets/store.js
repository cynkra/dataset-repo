import * as actions from './actions'
import {register} from '../dispatcher'
import {Record, List} from 'immutable'
import {datasetsCursor} from '../state'
import {getTagsFromDataset} from '../tags/store'

export const Dataset = Record({
  tableSchema: null,
  tableCount: null,
  databaseSize: null,
  rowCount: null,
  rowMax: null,
  columnCount: null,
  geoCount: null,
  dateCount: null,
  lobCount: null,
  stringCount: null,
  numericCount: null,
  idCount: null,
  referenceCount: null,
  selfRefencingTableCount: null,
  targetTableRowCount: null,
  qcHasEmptyTable: null,
  qcColumnCount: null,
  originalDatabaseName: null,
  uploader: null,
  uploadDate: null,
  domain: null,
  origin: null,
  description: null,
  modifiedBy: null,
  modifications: null,
  loopCount: null,
  nullCount: null,
  isArtificial: null,
  targetTable: null,
  targetColumn: null,
  targetId: null,
  targetDate: null,
  task: null,
  propagatedTableCount: null,
  runtime: null,
  accuracy: null,
})

export const dispatchToken = register(({action, data}) => {

  switch (action) {

  }

})

export function getDatasets() {
  return datasetsCursor()
}

export function getTags(dataset) {
  return getTagsFromDataset(dataset)
}
