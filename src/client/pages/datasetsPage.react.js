import DocumentTitle from 'react-document-title';
import React from 'react';
import DatasetList from '../datasets/datasetlist.react';
import Sidebar from '../common/sidebar.react';
import {getDatasets} from '../datasets/store';
import {fetchDatasets} from '../datasets/actions';

export default class DatasetsPage extends React.Component {

  componentWillMount() {
    return fetchDatasets();
  }

  render() {
    const datasets = getDatasets();

    return (
      <DocumentTitle title="Datasets">
        <section className="content">
          <section className="primary">
            <DatasetList datasets={datasets} />
          </section>
          <Sidebar />
        </section>
      </DocumentTitle>
    );
  }
}
