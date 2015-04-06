import App from './app/app.react';
import Datasets from './pages/datasets.react';
import NotFound from './pages/notfound.react';
import React from 'react';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={App} path="/">
    <DefaultRoute handler={Datasets} name="home" />
    <NotFoundRoute handler={NotFound} name="not-found" />
  </Route>
);
