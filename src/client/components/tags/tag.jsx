import React from 'react'
import immutable from 'immutable'
import {addons} from 'react/addons'

require('../../../../assets/css/tags/tag.styl')

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  propTypes: {
    tag: React.PropTypes.instanceOf(immutable.Map)
  },

  render() {
    const tag = this.props.tag
    const className = "tag tag--" + tag.get('type')

    return (
      <li>
        <a href="javascript:;" className={className} title={tag.get('name')}>{tag.get('value')}</a>
      </li>
    )
  }
})
