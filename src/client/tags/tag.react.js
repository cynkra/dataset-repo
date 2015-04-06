import PureComponent from '../components/purecomponent.react.js';
import React from 'react';
import immutable from 'immutable';
import {addons} from 'react/addons';

require('./tag.styl');

export default class Tag extends PureComponent {

  render() {
    const tag = this.props.tag;
    const className = "tag tag--" + tag.get('type');

    return (
      <li>
        <a href="javascript:;" className={className} title={tag.get('name')}>{tag.get('value')}</a>
      </li>
    );
  }
}

Tag.propTypes = {
  tag: React.PropTypes.instanceOf(immutable.Map)
};
