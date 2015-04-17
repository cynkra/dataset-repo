import PureComponent from '../common/purecomponent.react';
import React from 'react';
import immutable from 'immutable';
import Dataset from './dataset.react';

require('./datasetlist.styl');

export default class DatasetList extends PureComponent {

  render() {
    return (
      <ul className="datasetList">
        {this.props.datasets.map((dataset, i) => {
          return <Dataset dataset={dataset} key={dataset.get('originalDatabaseName')} />;
        })}
      </ul>
    );
  }
}

DatasetList.propTypes = {
  datasets: React.PropTypes.instanceOf(immutable.List)
};
