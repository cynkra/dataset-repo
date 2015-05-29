import * as actions from './actions';
import {register} from '../dispatcher';
import immutable from 'immutable';
import {contributorsCursor} from '../state';

export const Contributor = immutable.Record({
  name: null,
  count: 0
});

export const dispatchToken = register(({action, data}) => {
  switch (action) {
    case actions.fetchContributorsSuccess:
      contributorsCursor(contributors => {
        return contributors.withMutations(list => {
          list.clear();
          data.forEach((row, i) => {
            const contributor = new Contributor({
              name: row.uploader,
              count: row.count
            }).toMap();
            list.push(contributor);
          });
        });
      });
      break;
  }
});

export function getContributors() {
  return contributorsCursor();
}
