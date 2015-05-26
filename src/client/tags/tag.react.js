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
        <Link className={className} query={query} title={tag.get('name')} to="search">
          {this.getText(tag.get('text'))}
        </Link>
      </li>
    );
  }

  getText(name) {
    switch(name) {
      case 'LOB':
        return <abbr title='Data Type: Large Objects like images or long texts'>LOB</abbr>;
      default:
        return name;
    }
  }
}

Tag.propTypes = {
  tag: React.PropTypes.instanceOf(immutable.Map)
};
