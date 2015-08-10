import React from 'react';
import {Link} from 'react-router';
import Component from '../common/component.react';

require('./header.styl');

export default class Header extends Component {

  render() {
    return (
      <header className='Header'>
        <div className='Header-inner'>
          <Link to='home'><h1>Relational Dataset Repository</h1></Link>
          <ul className='Header-nav'>
            <li><Link to='search'>All Datasets</Link></li>
            <li><Link to='contributors'>Contributors</Link></li>
          </ul>
        </div>
      </header>
    );
  }

}
