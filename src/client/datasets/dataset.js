import {List, Map, Record} from 'immutable';
import {dataTypes} from '../datasets/store';

const DatasetRecord = Record({
  title: null,
  description: null,
  databaseSize: null,
  tableCount: null,
  rowCount: null,
  columnCount: null,
  isArtificial: null,
  domain: null,
  task: null,
  missingData: null,
  dataTypes: List(),
  bibtexPath: null,
  imgPath: null,
  mwbPath: null,
  origin: null,
  schema: null,
  versions: List(),
  modifications: null,
  uploader: null,
  compositeKeys: null,
  loops: null,
  instanceCount: null,
  targetTable: null,
  targetColumn: null,
  targetId: null,
  targetTimestamp: null
});

export default class Dataset extends DatasetRecord {

  static fromDB = (props) => {
    return new Dataset({
      title: props.get('original_database_name'),
      description: props.get('description'),
      databaseSize: props.get('database_size'),
      tableCount: props.get('table_count'),
      rowCount: props.get('row_count'),
      columnCount: props.get('column_count'),
      isArtificial: props.get('is_artificial'),
      domain: props.get('domain'),
      task: props.get('task'),
      missingData: props.get('null_count') > 0,
      dataTypes: dataTypes.filter((dataType) => {
        return props.get(dataType + '_count') > 0;
      }),
      bibtexPath: props.get('bibtex_path'),
      imgPath: props.get('img_path'),
      mwbPath: props.get('mwb_path'),
      origin: props.get('origin'),
      schema: props.get('TABLE_SCHEMA'),
      versions: props.get('versions')
        ? props.get('versions').map(version => Dataset.fromDB(version))
        : List(),
      modifications: props.get('modifications'),
      uploader: props.get('uploader'),
      compositeKeys: props.get('composite_key_count') > 0,
      loops: props.get('loop_count') > 0,
      instanceCount: props.get('instance_count'),
      targetTable: props.get('target_table'),
      targetColumn: props.get('target_column'),
      targetId: props.get('target_id'),
      targetTimestamp: props.get('target_timestamp')
    });
  }

  static revive = (props) => {
    if (props instanceof Map) {
      props = props
        .set('versions', props.get('versions')
          ? props.get('versions').map(version => Dataset.revive(version))
          : List());
    }
    return new Dataset(props);
  }

}
