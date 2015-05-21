import {objectToArray} from '../lib/helpers';
import Fetcher from '../lib/fetcher';

export default (request, response) => {
  const path = request.path.split('\/');
  const fetcherName = path[1];
  const methodName = path[2];

  try {
    const fetcher = Fetcher.get(fetcherName);
    const method = fetcher.mapping[methodName];
    const params = request.query;

    if (typeof method === 'function') {
      method.call(null, params)
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
