import React from 'react'
import immutable from 'immutable'
import {addons} from 'react/addons'
import Dataset from './dataset'

require('../../../../assets/css/datasets/datasetlist.styl')

export default React.createClass({

  mixins: [addons.PureRenderMixin],

  propTypes: {
    datasets: React.PropTypes.instanceOf(immutable.List)
  },

  render() {
    return (
      <ul className="datasetList">
        {this.props.datasets.map((dataset, i) => {
          return <Dataset dataset={dataset} key={dataset.get('originalDatabaseName')} />
        }).toArray()}
      </ul>
    )
  }

})
