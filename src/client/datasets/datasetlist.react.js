import PureComponent from '../components/purecomponent.react';
import React from 'react';
import immutable from 'immutable';
import {addons} from 'react/addons';
import Dataset from './dataset.react';

require('./datasetlist.styl');

export default class DatasetList extends PureComponent {

  render() {
    return (
      <ul className="datasetList">
        {this.props.datasets.map((dataset, i) => {
          return <Dataset dataset={dataset} key={dataset.get('originalDatabaseName')} />;
        }).toArray()}
      </ul>
    );
  }
}

DatasetList.propTypes = {
  datasets: React.PropTypes.instanceOf(immutable.List)
};
