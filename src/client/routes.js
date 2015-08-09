import App from './app/app.react';
import NotFoundPage from './pages/notFoundPage.react';
import SearchPage from './pages/searchPage.react';
import DatasetPage from './pages/datasetPage.react';
import ContributorsPage from './pages/contributorsPage.react';
import React from 'react';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={App} path="/">
    <NotFoundRoute handler={NotFoundPage} name='not-found' />
    <Route handler={SearchPage} name='search' path='search' />
    <Route handler={DatasetPage} name='dataset' path='dataset/:title' />
    <Route handler={ContributorsPage} name="contributors" path='contributors' />
  </Route>
);
