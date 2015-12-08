import React from 'react';
import Component from '../../common/component.react.js';
import DatasetType from '../dataset';
import DatasetInfoImage from './datasetInfoImage.react.js';
import DatasetInfoSummary from './datasetInfoSummary.react.js';
import DatasetInfoDetails from './datasetInfoDetails.react.js';
import DatasetInfoDownload from './datasetInfoDownload.react.js';
import DatasetInfoReferences from './datasetInfoReferences.react.js';

require('./datasetInfo.styl');

export default class DatasetInfo extends Component {

  static propTypes = {
    dataset: React.PropTypes.instanceOf(DatasetType).isRequired
  }

  render() {
    const dataset = this.props.dataset;
    const mwb = dataset.mwbPath
      ? '/assets/mwb/' + dataset.mwbPath
      : null;

    return (
      <div className='DatasetInfo'>
        <div className='DatasetInfo-header'>
          <DatasetInfoImage
            image={dataset.imgPath}
            schema={dataset.schema}
            title={dataset.title}
          />
          <DatasetInfoSummary
            dataset={dataset}
          />
        </div>

        <DatasetInfoDetails
          dataset={dataset}
        />

        <DatasetInfoReferences
          references={dataset.references}
        />

        <DatasetInfoDownload
          dataset={dataset}
        />

        { mwb ? (
          <div>
            <h2>MySQL Workbench Database Structure</h2>
            <a href={mwb}>Download</a>
          </div>
        ) : null }
      </div>
    );

  }

}
