import App from './app/app.react';
import DatasetPage from './pages/datasetPage.react';
import SearchPage from './pages/searchPage.react';
import NotFoundPage from './pages/notFoundPage.react';
import React from 'react';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={App} path="/">
    <DefaultRoute handler={SearchPage} name="search" />
    <NotFoundRoute handler={NotFoundPage} name="not-found" />
    <Route handler={DatasetPage} name="dataset" path="dataset/:name" />
  </Route>
);
