import * as actions from './actions';
import {register} from '../dispatcher';
import {searchFormCursor, searchResultsCursor} from '../state';
import {List} from 'immutable';
import {Dataset} from '../datasets/store';

export const dispatchToken = register(({action, data}) => {
  switch (action) {
    case actions.onSearchInputChange:
      searchFormCursor(searchForm => {
        return searchForm.set('q', data);
      });
      break;
    case actions.fetchSearchResultsStart:
      searchFormCursor(searchForm => {
        return searchForm.set('q', data);
      });
      searchResultsCursor(searchResults => {
        return searchResults.set('query', data);
      });
      break;
    case actions.fetchSearchResultsSuccess:
      searchResultsCursor(searchResults => {
        return searchResults.updateIn(['datasets'], List(), (datasets => {
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
        }));
      });
      break;
  }
});

export function getForm() {
  return searchFormCursor();
}

export function getSearchResults() {
  return searchResultsCursor();
}
