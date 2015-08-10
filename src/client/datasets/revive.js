import {Map} from 'immutable';
import {ResultCurrent} from './result';

export default function(value) {
  return Map(value)
    .set('current', ResultCurrent.revive(value.get('current')));
}
