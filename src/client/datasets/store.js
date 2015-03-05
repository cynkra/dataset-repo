import * as actions from './actions'
import dispatcher from '../dispatcher'
import {Record} from 'immutable'
import {datasetsCursor} from '../state'

// Note store is state-less. It's must for isomorphic app.

export const Dataset = Record({
  TABLE_SCHEMA: '',
  table_count: null,
  row_count: null,
  row_max_count: null,
  column_count: null,
  geo_count: null,
  date_count: null,
  lob_count: null,
  string_count: null,
  numeric_count: null,
  id_count: null,
  self_referencing_table_count: null,
  target_table_count: null,
  qc_column_count: null,
  uploader: '',
  upload_date: null,
  domain: '',
  origin: '',
  modifications: '',
  loop_count: null,
  null_count: null,
  is_artificial: null,
  target_table: '',
  target_column: '',
  target_id: '',
  target_date: '',
  task: '',
  propagated_table_count: null,
  runtime: null,
  accuracy: null,
})

export const dispatchToken = dispatcher.register((payload) => {
  let {action, data} = payload

  switch (action) {
    case actions.initDatasets:
    datasetsCursor(datasets => data)
    break
  }

})

export function getDatasets() {
  return datasetsCursor()
}
