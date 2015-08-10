import React from 'react';
import DatasetType from './dataset';
import Component from '../common/component.react';
import DatasetInfoSource from './datasetInfoSource.react';
import DatasetInfoVersions from './datasetInfoVersions.react';

require('./datasetInfoSummary.styl');

export default class DatasetInfoSummary extends Component {

  static propTypes = {
    dataset: React.PropTypes.instanceOf(DatasetType).isRequired
  }

  render() {
    const dataset = this.props.dataset;

    return (
      <div className='DatasetInfoSummary'>
        <h1 className='DatasetInfoSummary-heading'>{dataset.title}</h1>
        <p>
          {dataset.description}
        </p>

        <DatasetInfoSource bibtex={dataset.bibtexPath} origin={dataset.origin} />

        {dataset.versions.size
          ? <DatasetInfoVersions versions={dataset.versions} />
          : null
        }
      </div>
    );
  }

}
