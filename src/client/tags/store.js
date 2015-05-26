// import * as actions from './actions';
import {register} from '../dispatcher';
import {Record, List} from 'immutable';
import {capitalize, getSizeWithUnit} from '../../lib/helpers';
import {dataTypes} from '../datasets/store';

export const Tag = Record({
  type: null,
  value: null,
  name: null,
  text: null
});

export const dispatchToken = register(({action, data}) => {

});

export function getTagsFromDataset(dataset) {
  let tags = List();
  tags = tags.push(getDatabaseSizeTagFromDataset(dataset));
  tags = tags.push(getTableCountTagFromDataset(dataset));
  tags = tags.concat(getTypeTagFromDataset(dataset));
  tags = tags.push(getDomainTagFromDataset(dataset));
  tags = tags.concat(getTaskTagFromDataset(dataset));
  tags = tags.concat(getMissingDataTagFromDataset(dataset));
  tags = tags.concat(getDataTypeTagsFromDataset(dataset));
  return tags;
}

function getDatabaseSizeTagFromDataset(dataset) {
  const size = getSizeWithUnit(dataset.get('databaseSize'));
  const unit = size.slice(-2);

  return new Tag({
    type: 'databaseSize',
    value: [unit],
    name: 'Size',
    text: size
  }).toMap();
}

function getTableCountTagFromDataset(dataset) {
  const tableCount = dataset.get('tableCount');
  const value = tableCount <= 10
    ? ['0-10']
    : tableCount <= 30
      ? ['10-30']
      : ['30+'];

  return new Tag({
    type: 'tableCount',
    value: value,
    name: 'Table count',
    text: tableCount + ' Tables'
  }).toMap();
}

function getDataTypeTagsFromDataset(dataset) {
  let tags = List();

  dataTypes.map(dataType => {
    if (dataset.get(dataType + 'Count') > 0) {
      tags = tags.push(new Tag({
        type: 'dataType',
        value: [capitalize(dataType)],
        name: 'Data type',
        text: capitalize(dataType)
      }).toMap());
    }
  });

  return tags;
}

function getTypeTagFromDataset(dataset) {
  const typeTag = dataset.get('isArtificial');
  let tags = List();

  if (typeTag) {
    tags = tags.push(new Tag({
      type: 'type',
      value: ['Synthetic'],
      name: 'Type',
      text: 'Synthetic'
    }).toMap());
  }

  return tags;
}

function getDomainTagFromDataset(dataset) {
  const domain = dataset.get('domain');

  return new Tag({
    type: 'domain',
    value: [domain],
    name: 'Domain',
    text: domain
  }).toMap();
}

function getMissingDataTagFromDataset(dataset) {
  const missingData = dataset.get('nullCount');
  let tags = List();

  if (missingData > 0) {
    tags = tags.push(new Tag({
      type: 'missingData',
      value: ['Missing data'],
      name: 'Missing data',
      text: 'Missing data'
    }).toMap());
  }

  return tags;
}

function getTaskTagFromDataset(dataset) {
  const task = dataset.get('task');
  let tags = List();

  if (task !== null) {
    tags = tags.push(new Tag({
      type: 'task',
      value: [capitalize(task)],
      name: 'Task',
      text: capitalize(task)
    }).toMap());
  }

  return tags;
}
