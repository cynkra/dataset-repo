import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';

export default class NotFoundPage extends React.Component {

  render() {
    return (
      <DocumentTitle title='Page Not Found'>
        <section className="content">
          <h1>{`This page isn't available`}</h1>
          <p>The link may be broken, or the page may have been removed.</p>
          <Link to="search">Continue here please.</Link>
        </section>
      </DocumentTitle>
    );
  }
}
