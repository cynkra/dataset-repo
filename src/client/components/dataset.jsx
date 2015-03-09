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
      <li className="dataset">
        <h3 className="dataset-title">
          {dataset.get('original_database_name')} 
          <small>({dataset.get('TABLE_SCHEMA')})</small>
        </h3>
        <div className="dataset-uploader">
          {dataset.get('uploader')}
          <small>(<a href={dataset.get('origin')}>Origin</a>)</small>
        </div>
        {dataset.get('task')}
        <div className="tags">
          <div className="tag tag--domain">{dataset.get('domain')}</div>
          <div className="tag tag--artificial">{dataset.get('is_artificial') == 1 ? "artificial" : "real"}</div>
        </div>
      </li>
    )
  }
})