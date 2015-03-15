import React from 'react'
import Dataset from './dataset'
import immutable from 'immutable'
import {addons} from 'react/addons'

export default React.createClass({

  mixins: [addons.PureRenderMixin],

  propTypes: {
    datasets: React.PropTypes.instanceOf(immutable.List)
  },

  render() {
    return (
      <div className="datasetList">
        <section className="primary">
          <ul className="datasets">
            {this.props.datasets.map((dataset, i) => {
              return <Dataset dataset={dataset} key={dataset.get('TABLE_SCHEMA')} />
            }).toArray()}
          </ul>
        </section>
        <section className="sidebar">
          ... Filter ...
        </section>
      </div>
    )
  }

})