import immutable from 'immutable';
import * as actions from './actions';
import {register} from '../lib/dispatcher';
import {datasetsCursor} from '../state';
import Dataset from './dataset';
import {ResultCurrent} from './result';

export const dataTypes = immutable.List.of(
  'numeric',
  'string',
  'lob',
  'date',
  'geo'
);

export const dispatchToken = register(({action, data}) => {

  switch (action) {

    case actions.fetchDatasetStart:
      datasetsCursor(datasets => {
        return datasets.updateIn(['current'], new ResultCurrent, result => {
          return result.set('fetched', false);
        });
      });
      break;

    case actions.fetchDatasetSuccess:
      datasetsCursor(datasets => {
        return datasets.updateIn(['current'], new ResultCurrent, result => {
          return result
            .set('fetched', true)
            .set('dataset', Dataset.fromDB(immutable.fromJS(data)));
        });
      });
      break;

  }

});
