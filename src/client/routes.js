import App from './app/app.react';
import HomePage from './pages/homePage.react';
import NotFoundPage from './pages/notFoundPage.react';
import SearchPage from './pages/searchPage.react';
import DatasetPage from './pages/datasetPage.react';
import ContributePage from './pages/contributePage.react';
import AboutPage from './pages/aboutPage.react';
import ContactPage from './pages/contactPage.react';
import React from 'react';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={App} path="/">
    <DefaultRoute handler={HomePage} name='home' />
    <NotFoundRoute handler={NotFoundPage} name='not-found' />
    <Route handler={SearchPage} name='search' path='search' />
    <Route handler={DatasetPage} name='dataset' path='dataset/:title' />
    <Route handler={AboutPage} name="about" path='about' />
    <Route handler={ContributePage} name="contribute" path='contribute' />
    <Route handler={ContactPage} name="contact" path='contact' />
  </Route>
);
