var fetchers = {};

export default {
  register: (name: String, fetcher: Object) => {
    fetchers[name] = fetcher;
  },

  get: (name: String) => {
    if (!fetchers[name]) {
      throw new Error(`Register the fetcher first: '${name}'`);
    }

    return fetchers[name];
  }
};
