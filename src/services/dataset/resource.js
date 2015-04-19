export default {
  getDatasets: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var result = [
          'Hello',
          'World',
          'You'
        ];
        resolve(result);
      }, 3000);
    });
  },
  getDataset: (dataset: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(dataset);
      }, 3000);
    });
  }
};
