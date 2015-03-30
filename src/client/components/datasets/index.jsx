import DocumentTitle from 'react-document-title'
import React from 'react'
import DatasetList from './datasetlist'
import {getDatasets} from '../../datasets/store'

require('../../../../assets/css/datasets/datasets.styl')

export default React.createClass({

  render() {
    const datasets = getDatasets()

    return (
      <DocumentTitle title="Datasets">
        <section className="content">
          <section className="primary">
            <DatasetList datasets={datasets} />
          </section>
        </section>
      </DocumentTitle>
    )
  }

})
