import State from '../lib/state'

const initialState = process.env.IS_BROWSER
  ? window._appState
  : require('../server/initialstate')

export const state = new State(initialState)
export const datasetsCursor = state.cursor(['datasets'])
