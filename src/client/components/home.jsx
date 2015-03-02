import React from 'react'
import ReactRouter from 'react-router'
import {getDatasets} from '../todos/store'

export default React.createClass({
  mixins: [ReactRouter.State],

  render() {
    let datasets = getDatasets()

    return (
      <section id="datasetapp">
        <header id="header">
          <h1>Datasets</h1>
        </header>
        <section id="main">
          ... TBD ...
        </section>
      </section>
    )
  }

})
