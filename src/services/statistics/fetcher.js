import {getAPI} from '../APIUtils.js';
import resource from './resource';

const mapping = {
  'get_summary' : resource.getSummary
};

const statisticsAPI = getAPI('statistics', mapping);

export default {
  mapping: mapping,

  getSummary: () => {
    return statisticsAPI.get('get_summary');
  }
};
