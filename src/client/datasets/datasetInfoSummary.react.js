import PureComponent from '../common/purecomponent.react';
import React from 'react';
import immutable from 'immutable';
import DatasetInfoSource from './datasetInfoSource.react';
import DatasetInfoVersions from './datasetInfoVersions.react';

export default class DatasetInfoSummary extends PureComponent {
  render() {
    const dataset = this.props.dataset;
    return (
      <div className='DatasetInfo-summary'>
        <h1 className='DatasetInfo-heading'>{dataset.get('original_database_name')}</h1>
        <p>
          {dataset.get('description')}
        </p>

        <DatasetInfoSource bibtex={dataset.get('bibtex_path')} origin={dataset.get('origin')} />
        <DatasetInfoVersions dataset={dataset} />
      </div>
    );
  }
}

DatasetInfoSummary.propTypes = {
  dataset: React.PropTypes.instanceOf(immutable.Map).isRequired
};
