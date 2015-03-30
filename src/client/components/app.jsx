import DocumentTitle from 'react-document-title'
import React from 'react'
import {Link, RouteHandler} from 'react-router'
import {state} from '../state'
import Header from './header'

require('../../../assets/css/app.styl')

export default React.createClass({

  componentDidMount() {
    require('fastclick').attach(document.body)
  },

  render() {
    return (
      <DocumentTitle title={'Dataset repo'}>
        <div className="page">
          <Header />
          <RouteHandler />
        </div>
      </DocumentTitle>
    )
  }
})
