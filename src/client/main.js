import React from 'react'
import Router from 'react-router'
import routes from './routes'
import {state} from './state'

const app = document.getElementById('app')

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler />, app)
})

if('production' != process.env.NODE_ENV) {
  // Dev only code.
}
