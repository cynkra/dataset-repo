import {Map, Record} from 'immutable';
import Dataset from './dataset';

const ResultCurrentRecord = Record({
  dataset: new Dataset(),
  fetched: false
});

export class ResultCurrent extends ResultCurrentRecord {

  static revive = (props) => {
    if (props instanceof Map) {
      props = props.set('dataset', Dataset.revive(props.get('dataset')));
    }
    return new ResultCurrent(props);
  }

}
