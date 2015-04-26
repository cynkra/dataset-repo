import React from 'react';
import exposeRouter from '../common/exposerouter.react';
import Filter from './filter.react';
import {onSearchInputChange, submitSearchForm} from './actions';
import {getForm} from './store';

require('./search.styl');

let t;

class Search extends React.Component {

  onChange(e) {
    onSearchInputChange(e.target.value);
    if (t) {
      clearTimeout(t);
    }
    t = setTimeout(submitSearchForm, 500);
  }

  onSubmit(e) {
    e.preventDefault();
    submitSearchForm();
  }

  render() {
    const values = getForm();
    return (
      <form action='' method='get' onSubmit={this.onSubmit}>
        <input
          autoComplete='off'
          className='search'
          name='q'
          onChange={this.onChange}
          placeholder='Search for datasets'
          type='search'
          value={values.get('q')}
        />
        <Filter values={values} />
      </form>
    );
  }
}

Search.propTypes = {
  router: React.PropTypes.func
};

export default exposeRouter(Search);
