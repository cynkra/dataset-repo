import React from 'react';
import {Link} from 'react-router';
import Component from '../common/component.react';
import DatasetType from './dataset';
import {capitalize, getSizeWithUnit, getLocaleString, getTagName} from '../../lib/helpers';
import {getTableCountValue, getDataTypeText} from './tags/store';

require('./datasetInfoDetails.styl');

export default class DatasetInfoDetails extends Component {

  static propTypes = {
    dataset: React.PropTypes.instanceOf(DatasetType).isRequired
  }

  render() {
    const dataset = this.props.dataset;
    const size = getSizeWithUnit(dataset.databaseSize);

    return (
      <div className='DatasetInfoDetails'>
        <h2>Dataset details</h2>
        <dl>
          <dt>Associated task:</dt>
          <dd>
            {dataset.task
              ? <Link query={{task: [capitalize(dataset.task)]}} to='search'>
                  {capitalize(dataset.task)}
                </Link>
              : '?'}
          </dd>

          <dt>Domain:</dt>
          <dd>
            {dataset.domain
              ? <Link query={{domain: [dataset.domain]}} to='search'>
                  {dataset.domain}
                </Link>
              : '?'}
          </dd>

          <dt>Data types:</dt>
          <dd>
            <ul className='DatasetInfoDetails-dataTypes'>
              {this.getDataTypes(dataset)}
            </ul>
          </dd>

          <dt>
            <abbr title='Size of all the tables and indexes in the database'>Size:</abbr>
          </dt>
          <dd>
            {dataset.databaseSize
              ? <Link query={{databaseSize: [size.slice(-2)]}} to='search'>
                  {size}
                </Link>
              : '?'}
          </dd>

          <dt>Count of tables:</dt>
          <dd>
            {dataset.tableCount
              ? <Link query={{tableCount: [getTableCountValue(dataset.tableCount)]}} to='search'>
                  {getLocaleString(dataset.tableCount)}
                </Link>
              : '?'}
          </dd>

          <dt>
            <abbr title='Count of tuples in the whole dataset'>Count of rows:</abbr>
          </dt>
          <dd>{dataset.rowCount ? getLocaleString(dataset.rowCount) : '?'}</dd>

          <dt>
            <abbr
              title='Count of all attributes (including IDs and target(s)) in the whole dataset'
              >Count of columns:
            </abbr>
          </dt>
          <dd>{dataset.columnCount ? getLocaleString(dataset.columnCount) : '?'}</dd>

          <dt>Missing values:</dt>
          <dd>
            {dataset.missingData !== null
              ? (dataset.missingValues
                  ? <Link query={{missingData: ['Missing data']}} to='search'>Yes</Link>
                  : <Link query={{missingData: ['Complete data']}} to='search'>No</Link>)
              : '?'}
          </dd>

          <dt>Compound keys:</dt>
          <dd>
            {dataset.compositeKeys !== null
              ? (dataset.compositeKeys
                  ? <Link query={{compoundKeys: ['With compound keys']}} to='search'>Yes</Link>
                  : <Link query={{compoundKeys: ['Without compound keys']}} to='search'>No</Link>)
              : '?'}
          </dd>

          <dt>Loops:</dt>
          <dd>
            {dataset.loops !== null
              ? (dataset.loops
                  ? <Link query={{loops: ['With loops']}} to='search'>Yes</Link>
                  : <Link query={{loops: ['Without loops']}} to='search'>No</Link>)
              : '?'}
          </dd>
        </dl>
        <dl>
          <dt>
            <abbr title='Count of rows in target table'>Instance count:</abbr>
          </dt>
          <dd>{dataset.instanceCount ? getLocaleString(dataset.instanceCount) : '?'}</dd>

          <dt>Target table:</dt>
          <dd>{dataset.targetTable ? dataset.targetTable : '?'}</dd>

          <dt>
            <abbr title={'The \'label\' column to predict'}>Target column:</abbr>
          </dt>
          <dd>{dataset.targetColumn ? dataset.targetColumn : '?'}</dd>

          <dt>
            <abbr
              title='The unit for which to make the predictions (e.g. customer)'>Target ID:
            </abbr>
          </dt>
          <dd>{dataset.targetId ? dataset.targetId : '?'}</dd>

          <dt>
            <abbr title='To which time to make the prediction'>Target timestamp:</abbr>
          </dt>
          <dd>{dataset.targetTimestamp ? dataset.targetTimestamp : '?'}</dd>
        </dl>
      </div>
    );
  }

  getDataTypes(dataset) {
    return dataset.dataTypes
      .map((dataType) => {
        return (
          <li key={dataType}>
            <Link query={{dataType: [getDataTypeText(dataType)]}} to='search'>
              {getTagName(dataType)}
            </Link>
          </li>
        );
      });
  }

}
