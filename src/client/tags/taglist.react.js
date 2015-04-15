import PureComponent from '../components/purecomponent.react.js';
import React from 'react';
import immutable from 'immutable';
import Tag from './tag.react';

require('./taglist.styl');

export default class TagList extends PureComponent {

  render() {
    return (
      <ul className="tagList">
        {this.props.tags.map((tag, i) => {
          const value = tag.get('value');
          if (value !== null) {
            const key = tag.get('name') + '-' + value;
            return <Tag key={key} tag={tag} />;
          }
        }).toArray()}
      </ul>
    );
  }
}

TagList.propTypes = {
  tags: React.PropTypes.instanceOf(immutable.List)
};
