import resource from './resource';
import {getAPI} from '../APIUtils.js';

const datasetAPI = getAPI('dataset');

export default {
  getDatasets: () => {
    return datasetAPI.get(resource.getDatasets);
  },
  getDataset: (dataset: string) => {
    return datasetAPI.get(resource.getDataset, {dataset: dataset});
  }
};
