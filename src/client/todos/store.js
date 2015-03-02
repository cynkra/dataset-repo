import * as actions from './actions'
import dispatcher from '../dispatcher'
import {datasetsCursor} from '../state'

// Note store is state-less. It's must for isomorphic app.

export const dispatchToken = dispatcher.register((payload) => {
  let {action, data} = payload

  switch (action) {

  }

})

export function getDatasets() {
  return datasetsCursor()
}
