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
      <table>
        <thead>
          <th>TABLE_SCHEMA</th>
          <th>table_count</th>
          <th>row_count</th>
          <th>row_max_count</th>
          <th>column_count</th>
          <th>geo_count</th>
          <th>date_count</th>
          <th>lob_count</th>
          <th>string_count</th>
          <th>numeric_count</th>
          <th>id_count</th>
          <th>self_referencing_table_count</th>
          <th>target_table_count</th>
          <th>qc_column_count</th>
          <th>uploader</th>
          <th>upload_date</th>
          <th>domain</th>
          <th>origin</th>
          <th>modifications</th>
          <th>loop_count</th>
          <th>null_count</th>
          <th>is_artificial</th>
          <th>target_table</th>
          <th>target_column</th>
          <th>target_id</th>
          <th>target_date</th>
          <th>task</th>
          <th>propagated_table_count</th>
          <th>runtime</th>
          <th>accuracy</th>
        </thead>
        <tbody>
          {this.props.datasets.map((dataset, i) => {
            return <Dataset dataset={dataset} key={dataset.get('TABLE_SCHEMA')} />
          }).toArray()}
        </tbody>
      </table>
    )
  }

})