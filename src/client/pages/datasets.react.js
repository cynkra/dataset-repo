import DocumentTitle from 'react-document-title';
import React from 'react';
import DatasetList from '../datasets/datasetlist.react';
import {getDatasets} from '../datasets/store';

export default class Datasets extends React.Component {

  render() {
    const datasets = getDatasets();

    return (
      <DocumentTitle title="Datasets">
        <section className="content">
          <section className="primary">
            <DatasetList datasets={datasets} />
          </section>
        </section>
      </DocumentTitle>
    );
  }
}
