import * as actions from './actions'
import {register} from '../dispatcher'
import {Record} from 'immutable'
import {datasetsCursor} from '../state'

export const Dataset = Record({
  TABLE_SCHEMA: '',
  original_database_name: '',
  uploader: '',
  upload_date: null,
  domain: '',
  origin: '',
  description: '',
  modified_by: '',
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

export const dispatchToken = register(({action, data}) => {

  switch (action) {

  }

})

export function getDatasets() {
  return datasetsCursor()
}
