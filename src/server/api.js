import Fetcher from '../lib/fetcher';
import {underscoreToCamelCase} from '../lib/helpers';

Fetcher.register('dataset', require('../services/dataset/fetcher'));

export default (request, response) => {
  const path = request.path.split('\/');
  const fetcherName = path[1];
  const methodName = path[2];

  try {
    const fetcher = Fetcher.get(fetcherName);
    const method = underscoreToCamelCase(methodName);
    const params = Object.keys(request.query).map((key) => {
      return request.query[key];
    });

    if (typeof fetcher[method] === 'function') {
      fetcher[method].apply(null, params)
        .then((data) => {
          response.json(data);
        });
    } else {
      throw new Error(`Undefined method '${method}' in fetcher '${fetcherName}'`);
    }
  } catch (err) {
    response.status(500).send(`Error ${err}`);
  }
};
