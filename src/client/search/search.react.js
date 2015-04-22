import React from 'react';
import exposeRouter from '../common/exposerouter.react';
import Filter from './filter.react';
import {onSearchInputChange, onSearchFormSubmitted} from './actions';
import {getForm} from './store';

require('./search.styl');

class Search extends React.Component {

  render() {
    const values = getForm();
    return (
      <form action='search' method='get' onSubmit={onSearchFormSubmitted}>
        <input
          className='search'
          name='q'
          onChange={onSearchInputChange}
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
