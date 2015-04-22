import PureComponent from '../common/purecomponent.react.js';
import React from 'react';
import immutable from 'immutable';
import Tag from './tag.react';

require('./taglist.styl');

export default class TagList extends PureComponent {

  render() {
    return (
      <ul className="tagList">
        {this.props.tags.map((tag, i) => {
          const text = tag.get('text');
          if (text !== null) {
            const key = tag.get('name') + '-' + text;
            return <Tag key={key} tag={tag} />;
          }
        })}
      </ul>
    );
  }
}

TagList.propTypes = {
  tags: React.PropTypes.instanceOf(immutable.List)
};
