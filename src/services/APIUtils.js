import request from 'superagent';
import config from '../server/config';
import {camelCaseToUnderscore, objectToArray} from '../lib/helpers';

const isBrowser = process.env.IS_BROWSER;

export const API = {
  get: (fetcher, fn, params = []) => {
    if (isBrowser) {
      return new Promise(function(resolve, reject) {
        var URL = config.api.url + '/' + fetcher + '/' + camelCaseToUnderscore(fn.name);

        request
          .get(URL)
          .query(params)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err || !res.ok || !res.body) { return reject(); }
            resolve(res.body);
          });
      });
    } else {
      return fn.apply(null, objectToArray(params));
    }
  }
};

export function getAPI(fetcher) {
  let localAPI = {};

  Object.keys(API).forEach((key) => {
    localAPI[key] = (...params) => {
      params.unshift(fetcher);
      return API[key].apply(API, params);
    };
  });

  return localAPI;
}
