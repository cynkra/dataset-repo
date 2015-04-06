import * as actions from './actions';
import {register} from '../dispatcher';
import {Record, List} from 'immutable';

export const Tag = Record({
  type: null,
  name: null,
  value: null,
});

const dataTypes = [
  "numeric",
  "string",
  "lob",
  "date",
  "geo"
];


export const dispatchToken = register(({action, data}) => {

  switch (action) {

  }

});

export function getTagsFromDataset(dataset) {
  let tags = List.of(
    getSizeTagFromDataset(dataset),
    getTableCountTagFromDataset(dataset),
    getTypeTagFromDataset(dataset),
    getDomainTagFromDataset(dataset)
  );
  tags = tags.concat(getMissingValuesTagFromDataset(dataset));
  tags = tags.concat(getDataTypeTagsFromDataset(dataset));
  return tags;
}

function getSizeTagFromDataset(dataset) {
  const size = dataset.get('databaseSize');

  const sizeTag = size >= 1000
    ? 'GB'
    : size >= 1
      ? 'MB'
      : 'KB';
  const sizeTag2 = size >= 1000
    ? size / 1000 + ' GB'
    : size >= 1
      ? size + ' MB'
      : size * 1000 + ' KB';

  return new Tag({
    type: "size",
    name: "Size",
    value: sizeTag2
  }).toMap();
}

function getTableCountTagFromDataset(dataset) {
  return new Tag({
    type: "tableCount",
    name: "Table count",
    value: dataset.get('tableCount') + " Tables"
  }).toMap();
}

function getDataTypeTagsFromDataset(dataset) {
  let tags = List();

  dataTypes.map(dataType => {
    if(dataset.get(dataType + 'Count') > 0) {
      tags = tags.push(new Tag({
        type: "dataType",
        name: "Data type",
        value: dataType.charAt(0).toUpperCase() + dataType.slice(1) // TODO create method
      }).toMap());
    }
  });

  return tags;
}

function getTypeTagFromDataset(dataset) {
  const typeTag = dataset.get('isArtificial')
    ? "Artificial"
    : "Real";

  return new Tag({
    type: "type",
    name: "Type",
    value: typeTag
  }).toMap();
}

function getDomainTagFromDataset(dataset) {
  const domain = dataset.get('domain');
  return new Tag({
    type: "domain",
    name: "Domain",
    value: domain
  }).toMap();
}

function getMissingValuesTagFromDataset(dataset) {
  const missingValues = dataset.get('nullCount');
  let tags = List();
  if(missingValues > 0) {
    tags = tags.push(new Tag({
      type: "missingValues",
      name: "Missing values",
      value: "Missing values"
    }).toMap());
  }

  return tags;
}


