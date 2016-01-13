import React from 'react';
import immutable from 'immutable';
import Component from '../../common/component.react.js';

require('./datasetInfoAlgorithms.styl');

export default class DatasetInfoAlgorithms extends Component {

  static propTypes = {
    algorithms: React.PropTypes.instanceOf(immutable.List).isRequired
  };

  render() {
    const algorithms = this.props.algorithms;

    return algorithms.count() === 0
      ? null
      : (
        <div className='DatasetInfoAlgorithms'>
          <h2>Algorithms</h2>
          <table>
            <tr>
              <th>Dataset version</th>
              <th>Target</th>
              <th>Algorithm</th>
              <th>Author text</th>
              <th>Measure</th>
              <th>Value</th>
            </tr>
            {algorithms.map((a, i) => {
              return (
                <tr>
                  <td>{a.datasetVersion}</td>
                  <td>{a.target}</td>
                  <td>{a.algorithm}</td>
                  <td className='DatasetInfoAlgorithms-authorText'><a href={a.authorUrl} target='_blank'>{a.authorText}</a></td>
                  <td>{a.measure}</td>
                  <td>{a.value}</td>
                </tr>
              );
            })}
          </table>
        </div>
      );
  }

}
