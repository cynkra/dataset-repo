import React from 'react';
import {Link} from 'react-router';

require('./header.styl');

export default class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <div className="header-inner">
          <Link to="search"><h1>Relational dataset repository</h1></Link>
          <ul className="header-nav">
            <li><Link to="search">Datasets</Link></li>
            <li><Link to="contributors">Contributors</Link></li>
          </ul>
        </div>
      </header>
    );
  }
}
