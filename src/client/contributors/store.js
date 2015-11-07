import * as actions from './actions';
import {register} from '../lib/dispatcher';
import {contributorsCursor} from '../state';
import Contributor from './contributor';

export const dispatchToken = register(({action, data}) => {

  switch (action) {

    case actions.fetchContributorsSuccess:
      contributorsCursor(contributors => {
        return contributors.update('list', list => {
          return list.withMutations(list => {
            list.clear();
            data.forEach((row, i) => {
              list.push(new Contributor({
                name: row.uploader_name,
                url: row.uploader_url,
                count: row.count
              }));
            });
          });
        });
      });
      break;

  }

});
