import React from 'react';
import Component from '../common/component.react';
import immutable from 'immutable';

require('./datasetInfoReferences.styl');

export default class DatasetInfoReferences extends Component {

  static propTypes = {
    references: React.PropTypes.instanceOf(immutable.List).isRequired
  };

  render() {
    const references = this.props.references;

    return references.count() === 0
      ? null
      : (
        <div className='DatasetInfoReferences'>
          <h2>References</h2>
          <ul>
            {references.map((reference) => {
              return (
                <li>
                  <a href={reference.url} target="_blank">{reference.text}</a>
                </li>
              );
            })}
          </ul>
        </div>
      );
  }

}
