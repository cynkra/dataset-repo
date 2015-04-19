import {underscoreToCamelCase, objectToArray} from '../lib/helpers';

export default (request, response) => {
  const path = request.path.split('\/');
  const fetcherName = path[1];
  const methodName = path[2];

  try {
    const fetcher = request.fetcher.get(fetcherName);
    const method = underscoreToCamelCase(methodName);
    const params = objectToArray(request.query);

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
