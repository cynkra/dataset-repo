import React from 'react';
import exposeRouter from '../common/exposerouter.react';
import {onSearchInputChange} from './actions';
import {getForm} from './store';

require('./search.styl');

class Search extends React.Component {

  onSubmit(e) {
    e.preventDefault();
    const query = getForm().get('q');
    return query === ''
      ? this.props.router.transitionTo('home')
      : this.props.router.transitionTo('search', null, {q: query});
  }

  render() {
    const query = getForm().get('q');
    return (
      <form action='search' method='get' onSubmit={this.onSubmit.bind(this)}>
        <input
          className='search'
          defaultValue={query}
          name='q'
          onChange={onSearchInputChange}
          placeholder='Search for datasets'
          type='search'
          value={query}
        />
      </form>
    );
  }
}

Search.propTypes = {
  router: React.PropTypes.func
};

export default exposeRouter(Search);
