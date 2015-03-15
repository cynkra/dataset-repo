import React from 'react'
import immutable from 'immutable'
import {addons} from 'react/addons'
import TagList from '../tags/taglist'
import {getTags} from '../../datasets/store'

require('../../../../assets/css/datasets/dataset.styl')

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
          {dataset.get('originalDatabaseName')}
          <small>({dataset.get('tableSchema')})</small>
        </h3>
        <div className="dataset-uploader">
          {dataset.get('uploader')}
          <small>(<a href={dataset.get('origin')}>Origin</a>)</small>
        </div>
        {dataset.get('task')}
        <TagList tags={getTags(dataset)} />
      </li>
    )
  }
})
