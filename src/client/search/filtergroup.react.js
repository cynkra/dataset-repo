import React from 'react';
import {onFilterCheckboxChange} from './actions';
import {List} from 'immutable';

require('./filtergroup.styl');

export default class FilterGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    };
  }

  toggle(e) {
    e.preventDefault();
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const className = 'filterGroup filterGroup--' + (this.state.expanded ? 'expanded' : 'shrinked');
    return (
      <div className={className}>
        <h4 className='filterGroup-heading' onClick={this.toggle.bind(this)} onKeyDown={this.toggle.bind(this)} onKeyUp={this.toggle.bind(this)} role='button' tabIndex='0'>{this.props.displayName}</h4>
        <div className='filterGroup-body'>
          {this.props.values.map((value, i) => {
            const checked = (this.props.checked.indexOf(value) !== -1);
            return (
              <label className='filterGroup-line' key={this.props.name + '-' + i}>
                <input checked={checked} name={this.props.name + '[]'} onChange={onFilterCheckboxChange} type='checkbox' value={value}/>
                  {this.getText(value)}
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  getText(name) {
    switch(name) {
      case 'LOB':
        return <abbr title='Large Objects like images or long texts'>LOB</abbr>;
      default:
        return name;
    }
  }
}

FilterGroup.propTypes = {
  checked: React.PropTypes.instanceOf(List),
  displayName: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  values: React.PropTypes.array.isRequired
};
