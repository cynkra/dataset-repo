import {objectToArray} from '../lib/helpers';

export default (request, response) => {
  const path = request.path.split('\/');
  const fetcherName = path[1];
  const methodName = path[2];

  try {
    const fetcher = request.fetcher.get(fetcherName);
    const method = fetcher.mapping[methodName];
    const params = objectToArray(request.query);

    if (typeof method === 'function') {
      method.apply(null, params)
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
