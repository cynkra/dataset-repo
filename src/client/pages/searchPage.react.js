import DocumentTitle from 'react-document-title';
import React from 'react';
import exposeRouter from '../common/exposerouter.react';
import DatasetList from '../datasets/datasetlist.react';
import Sidebar from '../common/sidebar.react';
import {fetchSearchResults} from '../search/actions';
import {getSearchResults} from '../search/store';

class SearchPage extends React.Component {

  componentWillMount() {
    const query = this.props.router.getCurrentQuery();
    return fetchSearchResults(query);
  }

  // Will transition to
  componentWillReceiveProps() {
    const query = this.props.router.getCurrentQuery();
    if (query !== getSearchResults().get('query')) {
      return fetchSearchResults(query);
    }
  }

  render() {
    const datasets = getSearchResults().get('datasets');
    return (
      <DocumentTitle title="Search">
        <section className="content">
          <section className="primary">
            Searching...
            <DatasetList datasets={datasets} />
          </section>
          <Sidebar />
        </section>
      </DocumentTitle>
    );
  }
}

SearchPage.propTypes = {
  router: React.PropTypes.func
};

export default exposeRouter(SearchPage);
