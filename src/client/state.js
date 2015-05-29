import State from '../lib/state';

const initialState = process.env.IS_BROWSER
  ? window._appState
  : require('../server/initialstate');

export const state = new State(initialState);
export const $pendingActionsCursor = state.cursor(['$pendingActions']);
export const datasetsCursor = state.cursor(['datasets']);
export const currentDatasetCursor = state.cursor(['currentDataset']);
export const searchFormCursor = state.cursor(['searchForm']);
export const searchResultsCursor = state.cursor(['searchResults']);
export const contributorsCursor = state.cursor(['contributors']);
