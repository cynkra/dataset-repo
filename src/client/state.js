import State from '../lib/state';
import reviveApp from './app/revive';
import reviveContributors from './contributors/revive';
import reviveDatasets from './datasets/revive';
import reviveSearch from './search/revive';

const initialState = process.env.IS_BROWSER
  ? window._initialState
  : require('../server/initialstate');

export const state = new State(initialState, function(key, value) {
  switch (key) {
    case 'app': return reviveApp(value);
    case 'contributors': return reviveContributors(value);
    case 'datasets': return reviveDatasets(value);
    case 'search': return reviveSearch(value);
  }
});

export const appCursor = state.cursor(['app']);
export const pendingActionsCursor = state.cursor(['pendingActions']);
export const contactCursor = state.cursor(['contact']);
export const contributorsCursor = state.cursor(['contributors']);
export const datasetsCursor = state.cursor(['datasets']);
export const searchCursor = state.cursor(['search']);
export const tagsCursor = state.cursor(['tags']);
