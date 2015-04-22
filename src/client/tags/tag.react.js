import PureComponent from '../common/purecomponent.react.js';
import React from 'react';
import immutable from 'immutable';
import {Link} from 'react-router';

require('./tag.styl');

export default class Tag extends PureComponent {

  render() {
    const tag = this.props.tag;
    const type = tag.get('type');
    const className = 'tag tag--' + type;
    let query = {};
    query[type] = tag.get('value');

    return (
      <li>
        <Link className={className} query={query} title={tag.get('name')} to="search">{tag.get('text')}</Link>
      </li>
    );
  }
}

Tag.propTypes = {
  tag: React.PropTypes.instanceOf(immutable.Map)
};
