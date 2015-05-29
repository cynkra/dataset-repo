import PureComponent from '../common/purecomponent.react';
import React from 'react';
import {Link} from 'react-router';
import immutable from 'immutable';
import {capitalize, getSizeWithUnit, getLocaleString} from '../../lib/helpers';
import {dataTypes} from './store';
import {getDataTypeText} from '../tags/store';

export default class DatasetInfoDetails extends PureComponent {
  render() {
    const dataset = this.props.dataset;
    const size = getSizeWithUnit(dataset.get('database_size'));
    const nullCount = dataset.get('null_count');
    const compositeKeyCount = dataset.get('composite_key');
    const loopCount = dataset.get('loop_count');

    const tableCount = dataset.get('table_count');
    const tableCountValue = tableCount <= 10
    ? ['0-10']
    : tableCount <= 30
      ? ['10-30']
      : ['30+'];

    return (
      <div className='DatasetInfo-details'>
        <h2>Dataset details</h2>
        <dl>
          <dt>Associated Task:</dt>
          <dd>
            {dataset.get('task')
              ? <Link query={{task: [capitalize(dataset.get('task'))]}} to='search'>
                  {capitalize(dataset.get('task'))}
                </Link>
              : '?'}
          </dd>

          <dt>Domain:</dt>
          <dd>
            {dataset.get('domain')
              ? <Link query={{domain: [dataset.get('domain')]}} to='search'>
                  {dataset.get('domain')}
                </Link>
              : '?'}
          </dd>

          <dt>Data Types:</dt>
          <dd>
            <ul className='DatasetInfo-details-dataTypes'>
              {this.getDataTypes(dataset)}
            </ul>
          </dd>

          <dt>Size:</dt>
          <dd>
            {dataset.get('database_size')
              ? <Link query={{databaseSize: [size.slice(-2)]}} to='search'>
                  {size}
                </Link>
              : '?'}
          </dd>

          <dt>Number of tables:</dt>
          <dd>
            {dataset.get('table_count')
              ? <Link query={{tableCount: [tableCountValue]}} to='search'>
                  {getLocaleString(tableCount)}
                </Link>
              : '?'}
          </dd>

          <dt>
            <abbr title='Count of tuples in the whole dataset'>Number of rows:</abbr>
          </dt>
          <dd>{dataset.get('row_count') ? getLocaleString(dataset.get('row_count')) : '?'}</dd>

          <dt>
            <abbr
              title='Count of all attributes (including IDs and target(s)) in the whole dataset'
              >Number of columns:
            </abbr>
          </dt>
          <dd>{dataset.get('column_count') ? getLocaleString(dataset.get('column_count')) : '?'}</dd>

          <dt>Missing values:</dt>
          <dd>
            {nullCount !== null
              ? (nullCount === 0
                  ? <Link query={{missingData: ['Complete data']}} to='search'>No</Link>
                  : <Link query={{missingData: ['Missing data']}} to='search'>Yes</Link>)
              : '?'}
          </dd>

          <dt>Compound keys:</dt>
          <dd>
            {compositeKeyCount !== null
              ? (compositeKeyCount === 0
                  ? <Link query={{compoundKeys: ['Without compound keys']}} to='search'>No</Link>
                  : <Link query={{compoundKeys: ['With compound keys']}} to='search'>Yes</Link>)
              : '?'}
          </dd>

          <dt>Loops:</dt>
          <dd>
            {loopCount !== null
              ? (loopCount === 0
                  ? <Link query={{loops: ['Without loops']}} to='search'>No</Link>
                  : <Link query={{loops: ['With loops']}} to='search'>Yes</Link>)
              : '?'}
          </dd>
        </dl>
      </div>
    );
  }

  getDataTypes(dataset) {
    return dataTypes
      .filter((dataType) => { return dataset.get(dataType + '_count') > 0; })
      .map((dataType) => {
        return (
          <li key={dataType}>
            <Link query={{dataType: [getDataTypeText(dataType)]}} to='search'>
              {this.getDataTypeText(dataType)}
            </Link>
          </li>
        );
      });
  }

  getDataTypeText(name) {
    name = getDataTypeText(name);
    switch (name) {
      case 'LOB':
        return <abbr title='Large Objects like images or long texts'>LOB</abbr>;
      default:
        return name;
    }
  }
}

DatasetInfoDetails.propTypes = {
  dataset: React.PropTypes.instanceOf(immutable.Map).isRequired
};
