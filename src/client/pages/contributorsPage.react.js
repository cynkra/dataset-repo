import React from 'react';
import immutable from 'immutable';
import DocumentTitle from 'react-document-title';
import Component from '../common/component.react';
import ContributorsChart from '../contributors/contributorsChart.react';
import {fetchContributors} from '../contributors/actions';

export default class ContributorsPage extends Component {

  static propTypes = {
    contributors: React.PropTypes.instanceOf(immutable.Map).isRequired
  }

  componentWillMount() {
    return fetchContributors();
  }

  render() {
    const contributors = this.props.contributors.get('list');

    const leftMargin = contributors.reduce((prev, next) => {
      const x = prev.name ? prev.name.toString().length : prev;
      const y = next.name ? next.name.toString().length : next;
      return x > y ? x : y;
    }) || 100;

    return (
      <DocumentTitle title='Top Contributors'>
        <section className='content'>
          <ContributorsChart
            data={contributors}
            height={contributors.count() * 100}
            margins={{top: 0, right: 20, bottom: 20, left: (leftMargin + 2) * 8}}
            title='Top Contributors'
            width={992}
          />
        </section>
      </DocumentTitle>
    );
  }

}
