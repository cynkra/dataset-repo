import request from 'superagent';
import resource from './resource';

const isBrowser = process.env.IS_BROWSER;

export default {
  getDatasets: () => {
    if (isBrowser) {
      return new Promise(function(resolve, reject) {
        var URL = 'http://localhost:8000' + '/api/dataset/get_datasets';

        request
          .get(URL)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err || !res.ok || !res.body) { return reject(); }
            resolve(res.body);
          });
      });
    } else {
      return resource.getDatasets();
    }
  },
  getDataset: (dataset: string) => {
    if (isBrowser) {
      return new Promise(function(resolve, reject) {
        var URL = 'http://localhost:8000' + '/api/dataset/get_dataset';

        request
          .get(URL)
          .query({dataset: dataset})
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err || !res.ok || !res.body) { return reject(); }
            resolve(res.body);
          });
      });
    } else {
      return resource.getDataset(dataset);
    }
  }
};
