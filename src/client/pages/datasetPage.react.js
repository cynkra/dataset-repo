import DocumentTitle from 'react-document-title';
import exposeRouter from '../common/exposerouter.react';
import React from 'react';
import {Link} from 'react-router';
import {getDataset} from '../datasets/store';
import {fetchDataset} from '../datasets/actions';

class DatasetPage extends React.Component {

  componentWillMount() {
    const datasetName = this.props.router.getCurrentParams().name;
    return fetchDataset(datasetName);
  }

  render() {
    const dataset = getDataset();

    return (
      <DocumentTitle title="Dataset">
        <section className="content">
          <section className="primary">
            Name: {dataset.get('originalDatabaseName')}
          </section>
        </section>
      </DocumentTitle>
    );
  }
}

DatasetPage.propTypes = {
  router: React.PropTypes.func
};

export default exposeRouter(DatasetPage);
