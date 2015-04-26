import React from 'react';
import {onFilterCheckboxChange} from './actions';
import {List} from 'immutable';

require('./filtergroup.styl');

export default class FilterGroup extends React.Component {

  render() {
    return (
      <div className='filter-group'>
        <h4 className='filter-group-heading'>{this.props.displayName}</h4>
        <div className='filter-group-body'>
          {this.props.values.map((value, i) => {
            const checked = (this.props.checked.indexOf(value) !== -1);
            return (
              <label className='filter-group-line' key={this.props.name + '-' + i}>
                <input checked={checked} name={this.props.name + '[]'} onChange={onFilterCheckboxChange} type='checkbox' value={value}/>
                  {value}
              </label>
            );
          })}
        </div>
      </div>
    );
  }
}

FilterGroup.propTypes = {
  checked: React.PropTypes.instanceOf(List),
  displayName: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  values: React.PropTypes.array.isRequired
};
