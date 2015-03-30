import * as actions from './actions'
import {register} from '../dispatcher'
import {Record, List} from 'immutable'
import {datasetsCursor} from '../state'
import {getTagsFromDataset} from '../tags/store'

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
  geoCount: null,
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
