import DocumentTitle from 'react-document-title'
import React from 'react'
import {Link, RouteHandler} from 'react-router'
import {state} from '../state'

// Leverage webpack require goodness for feature toggle based dead code removal.
require('../../../assets/css/app.styl')

export default React.createClass({

  componentDidMount() {
    require('fastclick').attach(document.body)
  },

  render() {
    return (
      <DocumentTitle title={'Dataset repo'}>
        <div className="app">
          <RouteHandler />
        </div>
      </DocumentTitle>
    )
  }
})
