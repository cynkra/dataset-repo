import request from 'superagent';
import config from '../server/config';
import {objectToArray} from '../lib/helpers';

const isBrowser = process.env.IS_BROWSER;

export const API = {
  get: (fetcher: string, mapping: object, fn: string, params = {}) => {
    if (isBrowser) {
      return new Promise(function(resolve, reject) {
        var URL = config.api.url + '/' + fetcher + '/' + fn;

        request
          .get(URL)
          .query(getAsUriParameters(params))
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err || !res.ok || !res.body) { return reject(); }
            resolve(res.body);
          });
      });
    } else {
      return mapping[fn].apply(null, objectToArray(params));
    }
  }
};

export function getAPI(fetcher: string, mapping: object) {
  let localAPI = {};

  Object.keys(API).forEach((key) => {
    localAPI[key] = (...params) => {
      params.unshift(mapping);
      params.unshift(fetcher);
      return API[key].apply(API, params);
    };
  });

  return localAPI;
}

function getAsUriParameters(data) {
  return Object.keys(data).map(function(k) {
    if (Array.isArray(data[k])) {
      var keyE = encodeURIComponent(k + '[]');

      if (data[k].length === 0) {
        return keyE + '=';
      }

      return data[k].map(function(subData) {
        return keyE + '=' + encodeURIComponent(subData);
      }).join('&');
    } else {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }
  }).filter((n) => { return n !== ''; }).join('&');
}
