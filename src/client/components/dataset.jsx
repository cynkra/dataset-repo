import React from 'react'
import immutable from 'immutable'
import {addons} from 'react/addons'

export default React.createClass({

  mixins: [addons.PureRenderMixin],

  propTypes: {
    dataset: React.PropTypes.instanceOf(immutable.Map)
  },

  render() {
    const dataset = this.props.dataset

    return (
      <tr>
        <th>{dataset.get('TABLE_SCHEMA')}</th>
        <td>{dataset.get('table_count')}</td>
        <td>{dataset.get('row_count')}</td>
        <td>{dataset.get('row_max_count')}</td>
        <td>{dataset.get('column_count')}</td>
        <td>{dataset.get('geo_count')}</td>
        <td>{dataset.get('date_count')}</td>
        <td>{dataset.get('lob_count')}</td>
        <td>{dataset.get('string_count')}</td>
        <td>{dataset.get('numeric_count')}</td>
        <td>{dataset.get('id_count')}</td>
        <td>{dataset.get('self_referencing_table_count')}</td>
        <td>{dataset.get('target_table_count')}</td>
        <td>{dataset.get('qc_column_count')}</td>
        <td>{dataset.get('uploader')}</td>
        <td>{dataset.get('upload_date')}</td>
        <td>{dataset.get('domain')}</td>
        <td>{dataset.get('origin')}</td>
        <td>{dataset.get('modifications')}</td>
        <td>{dataset.get('loop_count')}</td>
        <td>{dataset.get('null_count')}</td>
        <td>{dataset.get('is_artificial')}</td>
        <td>{dataset.get('target_table')}</td>
        <td>{dataset.get('target_column')}</td>
        <td>{dataset.get('target_id')}</td>
        <td>{dataset.get('target_date')}</td>
        <td>{dataset.get('task')}</td>
        <td>{dataset.get('propagated_table_count')}</td>
        <td>{dataset.get('runtime')}</td>
        <td>{dataset.get('accuracy')}</td>
      </tr>
    )
  }
})