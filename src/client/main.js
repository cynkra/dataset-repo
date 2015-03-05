import React from 'react'
import Router from 'react-router'
import routes from './routes'
import {state} from './state'

(() => {
	state.load(window._appState)
	Router.run(routes, Router.HistoryLocation, (Handler) => {
		React.render(<Handler />, document.body)
	})
	if('production' != process.env.NODE_ENV) {
		// Dev only code.
	}
})
