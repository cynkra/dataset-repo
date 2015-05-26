import * as actions from './actions';
import * as datasetsActions from '../datasets/actions';
import {register} from '../dispatcher';
import {searchFormCursor, searchResultsCursor} from '../state';
import immutable from 'immutable';
import {Dataset} from '../datasets/store';

export const dispatchToken = register(({action, data}) => {
  switch (action) {
    case actions.onSearchInputChange:
      searchFormCursor(searchForm => {
        return searchForm.set('q', data);
      });
      break;
    case actions.onFilterCheckboxChange:
      const {name, value, checked} = data;
      searchFormCursor(searchForm => {
        return searchForm.updateIn([name], immutable.List(), (list => {
          return checked
            ? list.push(value)
            : list.delete(list.indexOf(value));
        }));
      });
      break;
    case datasetsActions.fetchDatasetStart:
      clearSearchForm();
      clearSearchResults();
      break;
    case datasetsActions.fetchDatasetsStart:
      clearSearchForm();
      clearSearchResults();
      break;
    case actions.fetchSearchResultsStart:
      clearSearchForm();
      clearSearchResults();
      searchFormCursor(searchForm => {
        return searchForm.withMutations(map => {
          for (let key in data) {
            map.set(key, immutable.fromJS(data[key]));
          }
        });
      });
      searchResultsCursor(searchResults => {
        return searchResults.set('query', data);
      });
      break;
    case actions.fetchSearchResultsSuccess:
      searchResultsCursor(searchResults => {
        return searchResults.updateIn(['datasets'], immutable.List(), (datasets => {
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
                geoCount: row.geo_count,
                task: row.task
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

function clearSearchForm() {
  searchFormCursor(searchForm => {
    return searchForm.withMutations(map => {
      map.set('q', '');
      map.set('databaseSize', immutable.List());
      map.set('tableCount', immutable.List());
      map.set('type', immutable.List());
      map.set('domain', immutable.List());
      map.set('task', immutable.List());
      map.set('dataType', immutable.List());
      map.set('missingData', immutable.List());
    });
  });
}

function clearSearchResults() {
  searchResultsCursor(searchResults => {
    return searchResults.withMutations(map => {
      map.set('query', '');
      map.setIn('datasets', immutable.List());
    });
  });
}
