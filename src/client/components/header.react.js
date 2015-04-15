import React from 'react';
import {Link} from 'react-router';

require('./header.styl');

export default class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <div className="header-inner">
          <Link to="home"><h1>Dataset repository</h1></Link>
        </div>
      </header>
    );
  }
}
