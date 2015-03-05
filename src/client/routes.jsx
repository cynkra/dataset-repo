import App from './components/app'
import NotFound from './components/notfound'
import React from 'react'
import Datasets from './components/datasets'
import {DefaultRoute, NotFoundRoute, Route} from 'react-router'

export default (
  <Route handler={App} path="/">
    <DefaultRoute handler={Datasets} name="home" />
    <NotFoundRoute handler={NotFound} name="not-found" />
  </Route>
)
