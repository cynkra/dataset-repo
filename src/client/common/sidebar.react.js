import React from 'react';
import Search from '../search/search.react';

export default class Sidebar extends React.Component {
  render() {
    return (
      <section className="sidebar">
        <Search />
      </section>
    );
  }
}
