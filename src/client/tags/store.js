import * as actions from './actions';
import {register} from '../dispatcher';
import {Record, List} from 'immutable';
import {capitalize, round} from '../../lib/helpers';

export const Tag = Record({
  type: null,
  name: null,
  value: null
});

const dataTypes = [
  'numeric',
  'string',
  'lob',
  'date',
  'geo'
];

export const dispatchToken = register(({action, data}) => {

});

export function getTagsFromDataset(dataset) {
  let tags = List();
  tags = tags.push(getSizeTagFromDataset(dataset));
  tags = tags.push(getTableCountTagFromDataset(dataset));
  tags = tags.concat(getTypeTagFromDataset(dataset));
  tags = tags.push(getDomainTagFromDataset(dataset));
  tags = tags.concat(getMissingValuesTagFromDataset(dataset));
  tags = tags.concat(getDataTypeTagsFromDataset(dataset));
  return tags;
}

function getSizeTagFromDataset(dataset) {
  const size = dataset.get('databaseSize');

  const sizeTag2 = size >= 1000
    ? round(size / 1000) + ' GB'
    : size >= 1
      ? round(size) + ' MB'
      : round(size * 1000) + ' KB';

  return new Tag({
    type: 'size',
    name: 'Size',
    value: sizeTag2
  }).toMap();
}

function getTableCountTagFromDataset(dataset) {
  return new Tag({
    type: 'tableCount',
    name: 'Table count',
    value: dataset.get('tableCount') + ' Tables'
  }).toMap();
}

function getDataTypeTagsFromDataset(dataset) {
  let tags = List();

  dataTypes.map(dataType => {
    if (dataset.get(dataType + 'Count') > 0)
      tags = tags.push(new Tag({
        type: 'dataType',
        name: 'Data type',
        value: capitalize(dataType)
      }).toMap());
  });

  return tags;
}

function getTypeTagFromDataset(dataset) {
  const typeTag = dataset.get('isArtificial');
  let tags = List();

  if (typeTag)
    tags = tags.push(new Tag({
      type: 'type',
      name: 'Type',
      value: 'Artificial'
    }).toMap());

  return tags;
}

function getDomainTagFromDataset(dataset) {
  const domain = dataset.get('domain');

  return new Tag({
    type: 'domain',
    name: 'Domain',
    value: domain
  }).toMap();
}

function getMissingValuesTagFromDataset(dataset) {
  const missingValues = dataset.get('nullCount');
  let tags = List();

  if (missingValues > 0)
    tags = tags.push(new Tag({
      type: 'missingValues',
      name: 'Missing values',
      value: 'Missing values'
    }).toMap());

  return tags;
}


