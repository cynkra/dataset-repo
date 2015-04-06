import DocumentTitle from 'react-document-title';
import Html from './html';
import Promise from 'bluebird';
import React from 'react';
import Router from 'react-router';
import config from './config';
import initialState from './initialstate';
import routes from '../client/routes';
import {state} from '../client/state';
import mysql from 'mysql';
import {Dataset} from '../client/datasets/store';

export default function render(req, res) {
  const path = req.path;
  return loadData(path)
    .then((appState) => renderPage(res, appState, path));
}

function loadData(path) {
  return new Promise((resolve, reject) => {
    let connection = mysql.createConnection({
      host:     'relational.fit.cvut.cz',
      user:     'guest',
      password: '******'
    });
    connection.query('USE meta');
    connection.query('SELECT original_database_name, description, database_size, table_count, is_artificial, domain, null_count, numeric_count, string_count, lob_count, date_count, geo_count FROM information WHERE original_database_name IS NOT NULL',
      (err, rows) => {
      let datasets = [];
      let names = [];
      if(!err) {
        rows.map((row,i) => {
          if(names.indexOf(row.original_database_name) == -1) {
            names.push(row.original_database_name);
            datasets.push(new Dataset({
              originalDatabaseName: row.original_database_name,
              description: row.description,
              databaseSize: row.database_size,
              tableCount: row.table_count,
              isArtificial: row.is_artificial,
              domain: row.domain,
              nullCount: row.null_count,
              numericCount: row.numeric_count,
              stringCount: row.string_count,
              lobCount: row.lob_count,
              dateCount: row.date_count,
              geoCount: row.geo_count,
            }).toMap());
          }
        });
      }

      const appState = {
        datasets: datasets
      };

      resolve(appState);
    })
  })
}

function renderPage(res, appState, path) {
  return new Promise((resolve, reject) => {
    const router = Router.create({
      routes,
      location: path,
      onError: reject,
      onAbort: (abortReason) => {
        if (abortReason.constructor.name === 'Redirect') {
          const {to, params, query} = abortReason;
          const path = router.makePath(to, params, query);
          res.redirect(path);
          resolve();
          return;
        }
        reject(abortReason);
      }
    });
    router.run((Handler, routerState) => {
      state.load(appState);
      const html = getPageHtml(Handler, appState);
      const notFound = routerState.routes.some(route => route.name == 'not-found');
      const status = notFound ? 404 : 200;
      res.status(status).send(html);
      resolve();
    });
  });
}

function getPageHtml(Handler, appState) {
  const appHtml = `<div id="app">${React.renderToString(<Handler />)}</div>`;
  const appScriptSrc = config.isProduction
    ? 'build/app.js?v=' + config.version
    : '//localhost:8888/build/app.js';

  let scriptHtml = `
    <script>
      (function() {
        window._appState = ${JSON.stringify(appState)};
        var app = document.createElement('script');
          app.type = 'text/javascript';
          app.async = true;
          app.src = '${appScriptSrc}';
        var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(app, s);
      })();
    </script>`;

  if (config.googleAnalyticsId != 'UA-XXXXXXX-X')
    scriptHtml += `
      <script>
        (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='//www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create','${config.googleAnalyticsId}');ga('send','pageview');
      </script>`;

  const title = DocumentTitle.rewind();

  return '<!DOCTYPE html>' + React.renderToStaticMarkup(
    <Html
      bodyHtml={appHtml + scriptHtml}
      isProduction={config.isProduction}
      title={title}
      version={config.version}
    />
  );
}
