import React from 'react'
import DatasetList from './datasetlist'
import {getDatasets} from '../datasets/store'

export default React.createClass({
  
  render() {
    const datasets = getDatasets()

    return (
      <section id="datasets">
        <header id="header">
          <h1>Datasets</h1>
        </header>
        <section id="main">
          <DatasetList datasets={datasets} />
        </section>
      </section>
    )
  }

})
