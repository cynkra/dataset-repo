import PureComponent from '../common/purecomponent.react';
import React from 'react';
import immutable from 'immutable';
import DatasetInfoImage from './datasetInfoImage.react';
import DatasetInfoSummary from './datasetInfoSummary.react';
import DatasetInfoDownload from './datasetInfoDownload.react';
import DatasetInfoDetails from './datasetInfoDetails.react';

require('./datasetInfo.styl');

export default class DatasetInfo extends PureComponent {
  render() {
    const dataset = this.props.dataset;
    const mwb = '/assets/mwb/' + this.props.mwb_path;

    return (
      <div className='DatasetInfo'>
        <div className='DatasetInfo-header'>
          <DatasetInfoImage title={dataset.get('original_database_name')} image={dataset.get('img_path')} schema={dataset.get('TABLE_SCHEMA')} />
          <DatasetInfoSummary dataset={dataset} />
        </div>

        <DatasetInfoDetails dataset={dataset} />

        <DatasetInfoDownload />

        { this.props.mwb_path ? (
          <div>
            <h2>MySQL Workbench Database Structure</h2>
            <a href={mwb}>Download</a>
          </div>
        ) : null }
      </div>
    );
  }
}

DatasetInfo.propTypes = {
  dataset: React.PropTypes.instanceOf(immutable.Map).isRequired
};
