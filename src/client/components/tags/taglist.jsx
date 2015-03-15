import React from 'react'
import immutable from 'immutable'
import {addons} from 'react/addons'
import Tag from './tag'

require('../../../../assets/css/tags/taglist.styl')

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    tags: React.PropTypes.instanceOf(immutable.List)
  },

  render() {
    return (
      <ul className="tagList">
        {this.props.tags.map((tag, i) => {
          const key = tag.get('name') + '-' + tag.get('value')
          return <Tag tag={tag} key={key} />
        }).toArray()}
      </ul>
    )
  }
})
