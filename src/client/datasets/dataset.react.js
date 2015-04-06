import PureComponent from '../components/purecomponent.react';
import React from 'react';
import immutable from 'immutable';
import {addons} from 'react/addons';
import TagList from '../tags/taglist.react';
import {getTags} from './store';

require('./dataset.styl');

export default class Dataset extends PureComponent {

  render() {
    const dataset = this.props.dataset;
    const title = dataset.get('originalDatabaseName');

    return (
      <li className="dataset">
        <h3 className="dataset-title">{title}</h3>
        {dataset.get('description') ?
          <p>{dataset.get('description').slice(0, 300)}</p> :
          ''
        }
        <TagList tags={getTags(dataset)} />
      </li>
    );
  }
}

Dataset.propTypes = {
  dataset: React.PropTypes.instanceOf(immutable.Map)
};
