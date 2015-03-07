import DocumentTitle from 'react-document-title'
import Html from './html'
import Promise from 'bluebird'
import React from 'react'
import Router from 'react-router'
import config from './config'
import routes from '../client/routes'
import {state} from '../client/state'
import mysql from 'mysql'
import {Dataset} from '../client/datasets/store'

export default function(path, locale) {
  return loadData(path, locale).then(renderPage)
}

function loadData(path, locale) {
  return new Promise((resolve, reject) => {
    let connection = mysql.createConnection({
      host:     'relational.fit.cvut.cz',
      user:     'guest',
      password: '******'
    })
    connection.query('USE meta')
    connection.query('SELECT * FROM background', (err, rows) => {
      let datasets = []
      if(!err) {
        rows.map((row,i) => {
          datasets.push(new Dataset({
            TABLE_SCHEMA: row.TABLE_SCHEMA,
            uploader: row.uploader,
            upload_date: row.upload_date,
            domain: row.domain,
            origin: row.origin,
            description: row.description,
            modified_by: row.modified_by,
            modifications: row.modifications,
            loop_count: row.loop_count,
            null_count: row.null_count,
            is_artificial: row.is_artificial,
            target_table: row.target_table,
            target_column: row.target_column,
            target_id: row.target_id,
            target_date: row.target_date,
            task: row.task,
            propagated_table_count: row.propagated_table_count,
            runtime: row.runtime,
            accuracy: row.accuracy,
          }).toMap())
        })
      }
      
      resolve({
        path,
        appState: {
          datasets: datasets
        }
      })
    })
  })
}

function renderPage({path, appState}) {
  return new Promise((resolve, reject) => {
    Router.run(routes, path, (Handler, routerState) => {
      state.load(appState)
      let html = getPageHtml(Handler, appState)
      let isNotFound = routerState.routes.some(route => route.name == 'not-found')
      resolve({
        html: html,
        status: isNotFound ? 404 : 200
      })
    })
  })
}

function getPageHtml(Handler, appState) {
  let appHtml = React.renderToString(<Handler />)
  let appScriptSrc = config.isProduction
    ? 'build/app.js?v=' + config.version
    : '//localhost:8888/build/app.js'
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
    </script>`
  scriptHtml = ``
  let title = DocumentTitle.rewind()

  return '<!DOCTYPE html>' + React.renderToStaticMarkup(
    <Html
      bodyHtml={appHtml + scriptHtml}
      isProduction={config.isProduction}
      title={title}
      version={config.version}
    />
  )
}
