import React from 'react';
import Router from 'react-router';
import routes from './routes';

const app = document.getElementById('app');

if (process.env.NODE_ENV !== 'production') {
  require('react-a11y')();
}

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler />, app);
});
