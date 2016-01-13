import React from 'react';
import immutable from 'immutable';
import Component from '../common/component.react';
import {getNameWithTooltip, getSizeWithUnit} from '../../lib/helpers';

require('./statisticsSummary.styl');

export default class StatisticsSummary extends Component {

  static propTypes = {
    summary: React.PropTypes.instanceOf(immutable.List).isRequired
  }

  render() {
    const summary = this.props.summary;

    return (
      <table className='statisticsSummary'>
        <thead>
          <tr>
            <th>Name</th>
            <th>{getNameWithTooltip('#Relations')}</th>
            <th>{getNameWithTooltip('#Attributes')}</th>
            <th>{getNameWithTooltip('#Tuples')}</th>
            <th>{getNameWithTooltip('#Instances')}</th>
            <th>{getNameWithTooltip('Size')}</th>
            <th>{getNameWithTooltip('Type')}</th>
            <th>{getNameWithTooltip('Domain')}</th>
            <th>{getNameWithTooltip('Task')}</th>
            <th>{getNameWithTooltip('Missing values')}</th>
            <th>{getNameWithTooltip('Loops')}</th>
            <th>{getNameWithTooltip('Compound keys')}</th>
          </tr>
        </thead>

        <tbody>
          {summary.map(s => {
            return (
              <tr>
                <td>{s.title}</td>
                <td>{s.tableCount}</td>
                <td>{s.columnCount}</td>
                <td>{s.rowCount}</td>
                <td>{s.instanceCount}</td>
                <td>{getSizeWithUnit(s.databaseSize)}</td>
                <td>{s.isArtificial ? 'Synthetic' : 'Real'}</td>
                <td>{s.domain}</td>
                <td>{s.task}</td>
                <td>{s.missingValues ? 'Yes' : 'No'}</td>
                <td>{s.loops ? 'Yes' : 'No'}</td>
                <td>{s.compoundKeys ? 'Yes' : 'No'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
