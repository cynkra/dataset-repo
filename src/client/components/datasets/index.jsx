import DocumentTitle from 'react-document-title'
import React from 'react'
import DatasetList from './datasetlist'
import {getDatasets} from '../../datasets/store'

export default React.createClass({

  render() {
    const datasets = getDatasets()

    return (
      <DocumentTitle title="Datasets">
        <section className="datasets">
          <header>
            <h1>Datasets</h1>
          </header>
          <section className="main">
            <DatasetList datasets={datasets} />
          </section>
        </section>
      </DocumentTitle>
    )
  }

})
