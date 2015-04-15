import DocumentTitle from 'react-document-title';
import React from 'react';
import {RouteHandler} from 'react-router';
import Header from '../common/header.react';

require('./app.styl');

export default class App extends React.Component {

  componentDidMount() {
    require('fastclick').attach(document.body);
  }

  render() {
    return (
      <DocumentTitle title='Dataset repo'>
        <div className="page">
          <Header />
          <RouteHandler />
        </div>
      </DocumentTitle>
    );
  }
}
